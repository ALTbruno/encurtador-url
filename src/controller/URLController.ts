import { config } from '../config/Constants';
import { Request, Response } from 'express';
import shortId from 'shortId';
import { URLModel } from '../database/model/URL';


export class URLController {

	public async shorten(req: Request, res: Response): Promise<void> {

		// Verificar se a URL já existe
		const { originURL } = req.body;
		const url = await URLModel.findOne({ originURL });
		if(url) {
			res.json(url);
			return
		}

		// Criar hash para a URL
		const hash = shortId.generate();
		const shortURL = `${config.API_URL}/${hash}`;

		// Salvar a URL no banco
		const newURL = await URLModel.create({ hash, shortURL, originURL });

		// Retornar a URL encurtada
		res.json({ newURL })
	}

	public async redirect(req: Request, res: Response): Promise<void> {
		
		// Pegar o hash gerado
		const { hash } = req.params;

		// Buscar a URL original pelo hash
		const url = await URLModel.findOne({ hash });

		// Redirecionar para URL original encontrada no BD
		if(url) {
			res.redirect(url.originURL);
			return;
		}

		res.status(400).json({ error: "URL not found"});
	}

	public async findById(req: Request, res: Response): Promise<void> {
		const { _id } = req.params;
		const url = await URLModel.findById({ _id });
		res.json(url);

	}
}
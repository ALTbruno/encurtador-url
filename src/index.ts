import express from 'express';
import cors from 'cors';
import { MongoConnection } from './database/MongoConnection';
import { URLController } from './controller/URLController';
const port = 5000;

const api = express();
api.use(cors());
api.use(express.json());

const database = new MongoConnection();
database.connect();

const urlController = new URLController();

api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);

api.listen(port, () => console.log(`SERVIDOR EXPRESS EXECUTANDO NA PORTA ${port}...`));


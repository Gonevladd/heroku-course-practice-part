/**
 * Created by vladyslavviotsekhovskyi on 29.09.2023.
 */

const dotenv = require('dotenv');
const express = require('express');
const app = express();
app.use(express.json());
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;

app.get('/api/v1/endpoint', (req, res) => {
    res.json({ dev: true });
});

app.get('/api/accounts', (req, res) => {
    client.query('SELECT id, name, sfid FROM salesforce.account', (err, data) => {
        if(err){
            res.json({ error: err});
            return;
        }
        for(let row of data.rows){
            console.log(JSON.stringify(row));
        }
        res.json({data: data});
    })
});


app.listen(PORT, () => console.log(`✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`));

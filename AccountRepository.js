/**
 * Created by vladyslavviotsekhovskyi on 04.10.2023.
 */

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

class AccountRepository {
    static async getAccounts() {
        let result = '';
        return new Promise((resolve, reject) => {
            client.query('SELECT id, name, sfid, phone, rating FROM salesforce.account', (err, data) => {
                if (err) {
                    reject(err);
                }
                for (let row of data.rows) {
                    console.log(JSON.stringify(row));
                }
                resolve(data);
            });
        });
    }

    static async insertAccount(account) {
        return new Promise((resolve, reject) => {
            try {
                client.query(`INSERT INTO salesforce.account (name, phone, rating, heroku_id__c) VALUES ($1, $2, $3, $4)`, [account?.name, account?.phone, account?.rating, account?.id]);
                resolve('Account inserted successfully');
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = AccountRepository;

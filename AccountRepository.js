/**
 * Created by vladyslavviotsekhovskyi on 04.10.2023.
 */

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    // connectionString: 'postgres://hxkrglktspbfkx:203307fe20a42a7b53ab464f86ae98a6809a3f8f660bb42a10dfa7a68ff0f5e2@ec2-44-218-92-155.compute-1.amazonaws.com:5432/dcnpenh4b18fb2',
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

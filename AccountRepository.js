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
    static async getAccounts(){
        await client.query('SELECT id, name, sfid, phone, rating FROM salesforce.account', (err, data) => {
            if(err){
                throw err;
            }
            for(let row of data.rows){
                console.log(JSON.stringify(row));
            }
            return data;
        })
    }
}


module.exports = AccountRepository;
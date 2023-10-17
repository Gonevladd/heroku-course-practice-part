/**
 * Created by vladyslavviotsekhovskyi on 17.10.2023.
 */
const AccountRepository = require('./AccountRepository');

class AccountService {
    static async insertAccountFromJSON(data) {
        let accounts = JSON.parse(data);
        for (let account of accounts) {
            await AccountRepository.insertAccount(account);
        }
        console.log('parsed accounts');
        console.log(accounts);
    }
}

module.exports = AccountService;

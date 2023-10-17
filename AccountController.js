/**
 * Created by vladyslavviotsekhovskyi on 04.10.2023.
 */

const AccountRepository = require('./AccountRepository');

class AccountController {
    static async getAllAccounts() {
        let result = '';
        try {
            result = await AccountRepository.getAccounts();
        } catch (err) {
            console.log(err);
        }

        return result;
    }
    static async insertAccount(account) {
        let result = '';
        try {
            result = await AccountRepository.insertAccount(account);
        } catch (e) {
            console.log(e);
        }
        return result;
    }
}

module.exports = AccountController;

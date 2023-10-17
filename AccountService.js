/**
 * Created by vladyslavviotsekhovskyi on 17.10.2023.
 */

class AccountService {
    static insertAccountFromJSON(data) {
        let accounts = JSON.parse(data);
        console.log('parsed accounts');
        console.log(accounts);
    }
}

module.exports = AccountService;

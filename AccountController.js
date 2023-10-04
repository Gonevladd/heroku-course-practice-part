/**
 * Created by vladyslavviotsekhovskyi on 04.10.2023.
 */

const AccountRepository = require('./AccountRepository');

class AccountController{

    static async getAllAccounts(){
        let result = '';
        try{
            result = await AccountRepository.getAccounts();
        }catch(err){
            console.log(err);
        }
        console.log('account repository');
        console.log(result);
        return result;
    }
}

module.exports = AccountController;
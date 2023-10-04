/**
 * Created by vladyslavviotsekhovskyi on 04.10.2023.
 */

const AccountRepository = require('./AccountRepository');

class AccountController{

    static async getAllAccounts(){
        let result = '';
        try{
            result = await AccountRepository.getAllAccounts();
        }catch(err){
            console.log(err);
        }
        return result;
    }
}

module.exports = AccountController;
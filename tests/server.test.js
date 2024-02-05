
const AccountController = require('../AccountController');


test('check for accounts', async () => {
    let response = await AccountController.getAllAccounts();
    expect(response).not.toBeNull();
});

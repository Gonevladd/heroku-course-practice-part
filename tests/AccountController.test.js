const AccountController = require('../AccountController');
test('Test retrieving accounts', async () => {
    let result = await AccountController.getAllAccounts();
    expect(result.length).toBeGreaterThan(0);
});

'use strict';

const { TEST_USER } = require('../src/config');
const { request } = require('./../src/config/test-config');
const { base64 } = require('./../src/config/utils');


const user = TEST_USER;

beforeAll(async () => {
    const userData = {
        "email": user.email,
        "password": user.password
    };
    const encodedCredintial = base64.encode(`${userData.email}:${userData.password}`);
    const loggedIn = await request.post('/signin').set('Authorization', `Basic ${encodedCredintial}`);
    user.accessToken = loggedIn.body.accessToken;
    console.log(user);
    // expect(loggedIn.status).toEqual(200);
    // expect(loggedIn.body.username).toEqual(user.username);
});


describe('Sale Item Route', () => {
    it('should ', async () => {
        const newSaleItem = {
            accessToken: user.accessToken,
            name: 'chai',
            quantity: 50,
            price: 100,
            StoreId: 1,

        };
        const Saletem = await request.post('/sale').send(newSaleItem);
        const addedSaleItem = Saletem.body;
        expect(addedSaleItem.name).toEqual(newSaleItem.name);
        expect(addedSaleItem.quantity).toEqual(newSaleItem.quantity);
    });
});




// describe('User Sign Up', () => {
//     it('should sign up a new user', async () => {
//         const userData = {
//             username: 'eman',
//             password: '1234',
//             email: 'eman@eman.eman',
//             phone: '0777777'
//         };

//         const data = await request.post('/signup').send(userData);
//         const newUser = data.body;
//         console.log(newUser);
//         expect(newUser.username).toEqual(userData.username);
//         expect(newUser.email).toEqual(userData.email);
//     });
// });

describe('User Sign In', () => {
    it('should sign in the user', async () => {

        const userData = {
            "email": "eman@eman.eman",
            "password": "1234"
        };
        const encodedCredintial = base64.encode(`${userData.email}:${userData.password}`);
        const loggedIn = await request.post('/signin').set('Authorization', encodedCredintial);
        expect(loggedIn.status).toEqual(200);
        expect(loggedIn.body.username).toEqual('eman');
    });
});
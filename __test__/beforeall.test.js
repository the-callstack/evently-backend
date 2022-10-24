"use strict";

const { TEST_USER } = require("../src/config");
const { request } = require("./../src/config/test-config");
const { base64 } = require("./../src/config/utils");

const user = TEST_USER;

beforeAll(async () => {

    const userData = {
        "email": user.email,
        "password": user.password
    };
    const encodedCredintial = base64.encode(`${userData.email}:${userData.password}`);
    const loggedIn = await request.post('/signin').set('Authorization', `Basic ${encodedCredintial}`);
    user.accessToken = loggedIn.body.accessToken;
});





// describe('User Sign Up', () => {
//     it('should sign up a new user', async () => {
//         const userData = user

//         const data = await request.post('/signup').send(userData);
//         const newUser = data.body;
//         console.log(newUser);
//         expect(user.username).toEqual(userData.username);
//         expect(newUser.email).toEqual(userData.email);
//     });
// });




describe('User Sign In', () => {
    it('should sign in the user', async () => {

        const userData = {
            "email": user.email,
            "password": user.password
        };
        const encodedCredintial = base64.encode(`${userData.email}:${userData.password}`);
        const loggedIn = await request.post('/signin').set('Authorization', encodedCredintial);
        expect(loggedIn.status).toEqual(200);
        expect(loggedIn.body.username).toEqual(user.username);
    });
});


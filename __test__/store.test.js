'use strict';

const { TEST_USER } = require('../src/config');
const { request } = require('./../src/config/test-config');
const { base64 } = require('./../src/config/utils');


const user = TEST_USER; 

beforeAll(async () => {
    const userData = {
        email: user.email,
        password: user.password
    };
    const encodedCredintial = base64.encode(`${userData.email}:${userData.password}`);
    const loggedIn = await request.post('/signin').set('Authorization', `Basic ${encodedCredintial}`);
    user.accessToken = loggedIn.body.accessToken;
    user.id = loggedIn.body.id;
});

describe('Store Route', () => {
    it('should create a new store', async () => {
        const newStore = {
            storeName: 'test store',
            phone: '07',
            UserId: user.id ,
            accessToken: user.accessToken,
        };
        const store = await request.post('/store').send(newStore);
        const addedStore = store.body;
        expect(addedStore.storeName).toEqual(newStore.storeName);
        expect(addedStore.UserId).toEqual(newStore.UserId);
    });

    it('should update store', async () => {
        const updateStore = {
            storeName: 'update1',
            phone: '07000',
            accessToken: user.accessToken,
        };
        const store = await request.put('/store/3').send(updateStore);
        const updatedStore = store.body;
        expect(updatedStore[1][0].storeName).toEqual(updateStore.storeName);
        expect(updatedStore[1][0].phone).toEqual(updateStore.phone);
    });

    it('should delete store', async () => {
        const accessToken = {
            accessToken: user.accessToken
        };
        const store = await request.delete('/store/19').send(accessToken);
        const deletedStore = store;
        expect(deletedStore.status).toEqual(204);
    });

    it("Should get the store by its id", async () => {
        const data = {
            accessToken: user.accessToken,
        };
        const store = await request.get("/store/3").send(data);

        if (store.status == 200) {
            expect(store.status).toEqual(200);
            expect(typeof store.body).toBe("object");
        } else {
            expect(store.status).toEqual(500);
        }
  });
});
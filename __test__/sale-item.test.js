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

describe('sale item rout', () => {
    it('should create a new sale item', async () => {
        const newSaleItem = {
            name: 'chair',
            quantity: 15,
            price: 400 ,
            StoreId: 4,
            accessToken: user.accessToken
        };
        const saleItem = await request.post('/sale').send(newSaleItem);
        const addedSaleItem = saleItem.body;
        expect(addedSaleItem.name).toEqual(newSaleItem.name);
        expect(addedSaleItem.quantity).toEqual(newSaleItem.quantity);
        expect(addedSaleItem.price).toEqual(newSaleItem.price);
    });

    it('should update sale itme', async () => {
        const newUpdateSaleItem = {
            name:"chair updated",
            quantity: 25,
            price: 700,
            StoreId: 4,
            accessToken: user.accessToken
        };
        const updateSaleItem = await request.put('/sale/5').send(newUpdateSaleItem);
        const updatedSaleItem = updateSaleItem.body;
        expect(updatedSaleItem[1][0].name).toEqual(newUpdateSaleItem.name);
        expect(updatedSaleItem[1][0].quantity).toEqual(newUpdateSaleItem.quantity);
        expect(updatedSaleItem[1][0].price).toEqual(newUpdateSaleItem.price);
    });

    it('should delete sale item', async () => {
        const accessToken = {
            accessToken: user.accessToken
        };
        const saleItem = await request.delete('/sale/4').send(accessToken);
        const deletedSalelItem = saleItem;
        expect(deletedSalelItem.status).toEqual(204);
    });

    it("Should get the sale item by its id", async () => {
        const data = {
            accessToken: user.accessToken,
        };
        const saleItem = await request.get("/sale/5").send(data);

        if (saleItem.status == 200) {
            expect(saleItem.status).toEqual(200);
            expect(typeof saleItem.body).toBe("object");
        } else {
            expect(saleItem.status).toEqual(401);
        }
  });
});
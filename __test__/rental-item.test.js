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

describe('rental item Route', () => {
    it('should create new rental item', async () => {
        const newRental = {
            name:"candy",
            quantity: 10,
            price: 10,
            StoreId: 4,
            accessToken: user.accessToken ,
            UserId: user.id
        };
        const rentalItem = await request.post('/rental').send(newRental)
        const assRentalItem = rentalItem.body;
        expect(assRentalItem.name).toEqual(newRental.name);
        expect(assRentalItem.quantity).toEqual(newRental.quantity);
        expect(assRentalItem.price).toEqual(newRental.price);
        expect(assRentalItem.StoreId).toEqual(newRental.StoreId);
    });

    it('should update rental itme', async () => {
        const newUpdateRental = {
            name:"candy updated",
            quantity: 100,
            price: 100,
            StoreId: 4,
            accessToken: user.accessToken
        };
        const updateRental = await request.put('/rental/4').send(newUpdateRental);
        const updatedrentalItem = updateRental.body;

        expect(updatedrentalItem[1][0].name).toEqual(newUpdateRental.name);
        expect(updatedrentalItem[1][0].quantity).toEqual(newUpdateRental.quantity);
        expect(updatedrentalItem[1][0].price).toEqual(newUpdateRental.price);
    });

    it('should delete rental item', async () => {
        const accessToken = {
            accessToken: user.accessToken
        };
        const rentalItem = await request.delete('/store/19').send(accessToken);
        const deletedRentalItem = rentalItem;
        expect(deletedRentalItem.status).toEqual(204);
    });

    
    it("Should get the rental Item by its id", async () => {
        const data = {
            accessToken: user.accessToken,
        };
        const rentalItem = await request.get("/rental/19").send(data);

        if (rentalItem.status == 200) {
            expect(rentalItem.status).toEqual(200);
            expect(typeof rentalItem.body).toBe("object");
        } else {
            expect(rentalItem.status).toEqual(500);
        }
  });
});
'use strict';

const { TEST_USER } = require('../src/config');
const { request } = require('../src/config/test-config');
const { base64 } = require('../src/config/utils');


const user = TEST_USER;

beforeAll(async () => {
    // const temp = await request.delete('/signout');
    const userData = {
        "email": user.email,
        "password": user.password
    };
    const encodedCredintial = base64.encode(`${userData.email}:${userData.password}`);
    const loggedIn = await request.post('/signin').set('Authorization', `Basic ${encodedCredintial}`);
    user.accessToken = loggedIn.body.accessToken;
});

afterEach(async () => {

})

describe('Categories Routes', () => {
    it('should create and delete an category ', async () => {
        const newCategory = {
            name: "test create category",
            accessToken: user.accessToken,
        };
        const createdCat = await request.post('/testcat').send(newCategory);
        const addedCategory = createdCat.body;
        expect(addedCategory.createdCategory.name).toEqual(newCategory.name);
        const deletedCategory = await request.delete(`/testcat/${addedCategory.createdCategory.id}`).send(newCategory);

    });

    it('should update an category\'s event ', async () => {
        const newCategory = {
            name: "test update category",
            accessToken: user.accessToken,
        };
        const createdCat = await request.post('/testcat').send(newCategory);
        const addedCategory = createdCat.body;
        const updateCategory = {
            accessToken: user.accessToken,
            EventsCategory: {
                new: {
                    id: [
                        3
                    ]
                },
                cancelled: {
                    id: [
                        3
                    ]
                }
            }
        }
        const newUpdateCategory = await request.put(`/testcat/${addedCategory.createdCategory.id}`).send(updateCategory);
        // expect(newUpdateCategory.body.deleted).toEqual(1)
        expect(newUpdateCategory.body.results.foundCategory.id).toEqual(addedCategory.createdCategory.id)
        expect(newUpdateCategory.body.newEvent.id[0]).toEqual(updateCategory.EventsCategory.new.id[0])

        const deletedCategory = await request.delete(`/testcat/${addedCategory.createdCategory.id}`).send(newCategory);
    });

    it('should get an Category ', async () => {
        const newCategory = {
            name: "test update category",
            accessToken: user.accessToken,
        };

        const createdCat = await request.post('/testcat').send(newCategory);
        const addedCategory = createdCat.body;
        const getCategory = await request.get(`/testcat/${addedCategory.createdCategory.id}`).send(newCategory);
        expect(getCategory.body.id).toEqual(addedCategory.createdCategory.id)
        expect(getCategory.body.name).toEqual(addedCategory.createdCategory.name)

        const deletedCategory = await request.delete(`/testcat/${addedCategory.createdCategory.id}`).send(newCategory);


    });

    it('should delete an Category ', async () => {
        const newCategory = {
            name: "test update category",
            accessToken: user.accessToken,
        };
        const createdCat = await request.post('/testcat').send(newCategory);
        const addedCategory = createdCat.body;
        const deletedCategory = await request.delete(`/testcat/${addedCategory.createdCategory.id}`).send(newCategory);
        expect(deletedCategory.status).toEqual(204);
    });

});

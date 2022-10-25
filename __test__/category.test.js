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
    it('should create a new category ', async () => {
        const newCategory = {
            name: "test create category",
            accessToken: user.accessToken,
        };
        const createdCat = await request.post('/category').send(newCategory);
        const addedCategory = createdCat.body;
        expect(addedCategory.createdCategory.name).toEqual(newCategory.name);
        const deletedCategory = await request.delete(`/category/${addedCategory.createdCategory.id}`).send(newCategory);

    });

    it('should update an category\'s event ', async () => {
        const newCategory = {
            name: "test update category",
            accessToken: user.accessToken,
        };
        const newEvent = {
            eventType: "test update event2",
            accessToken: user.accessToken,
        };
        const createdEvent = await request.post('/event').send(newEvent);
        const addedEvent = createdEvent.body;

        const createdCat = await request.post('/category').send(newCategory);
        const addedCategory = createdCat.body;
        const updateCategory = {
            accessToken: user.accessToken,
            EventsCategory: {
                new: {
                    id: [
                        addedEvent.createdEvent.id
                    ]
                },
                cancelled: {
                    id: [
                        addedEvent.createdEvent.id
                    ]
                }
            }
        }
        const newUpdateCategory = await request.put(`/category/${addedCategory.createdCategory.id}`).send(updateCategory);
        // expect(newUpdateCategory.body.deleted).toEqual(1)
        expect(newUpdateCategory.body.results.foundCategory.id).toEqual(addedCategory.createdCategory.id)
        expect(newUpdateCategory.body.newEvent.id[0]).toEqual(updateCategory.EventsCategory.new.id[0])

        const deletedCategory = await request.delete(`/category/${addedCategory.createdCategory.id}`).send(newCategory);
        const deletedevent = await request.delete(`/event/${addedEvent.createdEvent.id}`).send(newEvent);
    });

    it('should get an Category ', async () => {
        const newCategory = {
            name: "test update category",
            accessToken: user.accessToken,
        };

        const createdCat = await request.post('/category').send(newCategory);
        const addedCategory = createdCat.body;
        const getCategory = await request.get(`/category/${addedCategory.createdCategory.id}`).send(newCategory);
        expect(getCategory.body.id).toEqual(addedCategory.createdCategory.id)
        expect(getCategory.body.name).toEqual(addedCategory.createdCategory.name)

        const deletedCategory = await request.delete(`/category/${addedCategory.createdCategory.id}`).send(newCategory);


    });

    it('should delete an Category ', async () => {
        const newCategory = {
            name: "test update category",
            accessToken: user.accessToken,
        };
        const createdCat = await request.post('/category').send(newCategory);
        const addedCategory = createdCat.body;
        const deletedCategory = await request.delete(`/category/${addedCategory.createdCategory.id}`).send(newCategory);
        expect(deletedCategory.status).toEqual(204);
    });

});

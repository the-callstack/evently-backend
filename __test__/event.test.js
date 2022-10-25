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

describe('Events Routes', () => {
    it('should create  a new event ', async () => {
        const newEvent = {
            eventType: "test create event",
            accessToken: user.accessToken,
        };
        const createdEvent = await request.post('/event').send(newEvent);
        const addedEvent = createdEvent.body;
        expect(addedEvent.createdEvent.name).toEqual(newEvent.name);
        const deletedevent = await request.delete(`/event/${addedEvent.createdEvent.id}`).send(newEvent);
    });

    it('should update an event\'s categorys ', async () => {
        const newEvent = {
            eventType: "test update event",
            accessToken: user.accessToken,
        };

        const newCategory = {
            name: "test create category2",
            accessToken: user.accessToken,
        };
        const createdEvent = await request.post('/event').send(newEvent);
        const addedEvent = createdEvent.body;
        const createdCat = await request.post('/category').send(newCategory);
        const addedCategory = createdCat.body;
        const updateEvent = {
            accessToken: user.accessToken,
            EventsCategory: {
                new: {
                    id: [
                        addedCategory.createdCategory.id
                    ]
                },
                cancelled: {
                    id: [
                        addedCategory.createdCategory.id
                    ]
                }
            }
        }
        const newUpdateEvent = await request.put(`/event/${addedEvent.createdEvent.id}`).send(updateEvent);
        expect(newUpdateEvent.body.deleted).toEqual(1)
        expect(newUpdateEvent.body.addCategories[0].EventId).toEqual(addedEvent.createdEvent.id)
        expect(newUpdateEvent.body.addCategories[0].CategoryId).toEqual(updateEvent.EventsCategory.new.id[0])
        const deletedevent = await request.delete(`/event/${addedEvent.createdEvent.id}`).send(newEvent);
        const deletedCategory = await request.delete(`/category/${addedCategory.createdCategory.id}`).send(newCategory);
    });

    it('should get an event ', async () => {
        const newEvent = {
            eventType: "test get event",
            accessToken: user.accessToken,
        };
        const createdEvent = await request.post('/event').send(newEvent);
        const addedEvent = createdEvent.body;
        const getEvent = await request.get(`/event/${addedEvent.createdEvent.id}`).send(newEvent);
        expect(getEvent.body.id).toEqual(addedEvent.createdEvent.id)
        expect(getEvent.body.eventType).toEqual(addedEvent.createdEvent.eventType)

        const deletedevent = await request.delete(`/event/${addedEvent.createdEvent.id}`).send(newEvent);


    });

    it('should delete an event ', async () => {
        const newEvent = {
            eventType: "test delete event",
            accessToken: user.accessToken,
        };

        const createdEvent = await request.post('/event').send(newEvent);
        const addedEvent = createdEvent.body;
        const deletedevent = await request.delete(`/event/${addedEvent.createdEvent.id}`).send(newEvent);
        expect(deletedevent.status).toEqual(204);
    });

});

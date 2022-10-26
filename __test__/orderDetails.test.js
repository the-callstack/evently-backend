"use strict";

const { TEST_USER } = require("../src/config");
const { request } = require("./../src/config/test-config");
const { base64 } = require("./../src/config/utils");

const user = TEST_USER;

beforeAll(async () => {
  const userData = {
    email: user.email,
    password: user.password,
  };
  const encodedCredintial = base64.encode(
    `${userData.email}:${userData.password}`
  );
  const loggedIn = await request
    .post("/signin")
    .set("Authorization", `Basic ${encodedCredintial}`);
  user.accessToken = loggedIn.body.accessToken;
});

describe("Test creation of the order and details", () => {
  it("Create order with details", async () => {
    const orderDetails = {
      orderDate: "2022-10-23",
      deleveryDate: "2022-10-26",
      accessToken: user.accessToken,
      details: [
        {
          SaleItemId: 1,
          quantity: 20,
          price: 10,
        },
        {
          RentalItemId: 1,
          quantity: 15,
          price: 15,
          trackerId: 22
        },
      ],
    };
    const order = await request.post("/details").send(orderDetails);
    expect(order.status).toBe(200);
    expect(order.body.createdOrder.totalPrice).toEqual(425);
  });
});

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

describe("Order Route", () => {
  it("Should get the order with details by its id", async () => {
    const data = {
      accessToken: user.accessToken,
    };
    const orders = await request.get("/order/3").send(data);
    if (orders.status == 200) {
      expect(orders.status).toEqual(200);
      expect(typeof orders.body).toBe("object");
    } else {
      expect(orders.status).toEqual(500);
      expect(orders).toBeNull();
    }
  });

  it("Should return all orders for the admin", async () => {
    const data = {
      accessToken: user.accessToken,
    };

    const allOrders = await request.get("/order").send(data);
    expect(allOrders.status).toEqual(200);
    expect(typeof allOrders).toEqual("object");
    expect(allOrders.body[0].UserId).toEqual(1);
  });
});

const request = require("supertest");
const app = require("../../src/app");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });
  it("should be able to authenticate with valid credentials", async () => {
    const user = await User.create({
      name: "Alex",
      email: "abauruel@gmail.com",
      password_hash: "123"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123"
      });
    expect(response.status).toBe(200);
  });
});
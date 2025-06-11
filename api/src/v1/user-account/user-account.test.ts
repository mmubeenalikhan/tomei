import request from "supertest";
import app from "../../app";
import sequelize from "../../lib/sequelize";
import { UserAccount } from "../../models";

const ENDPOINT = "/api/v1/user-accounts";

describe("POST /api/v1/user-accounts", () => {
  beforeAll(async () => {
    await UserAccount.destroy({ where: {}, truncate: true });
  });

  afterEach(async () => {
    await UserAccount.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("creates a user account with valid data", async () => {
    const res = await request(app).post(ENDPOINT).send({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe("jane@example.com");
    expect(res.body.data.passwordHash).not.toBe("password123");
  });

  it("rejects a duplicate email", async () => {
    await request(app).post(ENDPOINT).send({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    });

    const res = await request(app).post(ENDPOINT).send({
      name: "Jane Doe Again",
      email: "jane@example.com",
      password: "password456",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(
      res.body.errors.some((error: { msg: string }) =>
        error.msg.includes("already in use")
      )
    ).toBe(true);
  });

  it("rejects a request missing required fields", async () => {
    const res = await request(app).post(ENDPOINT).send({
      name: "Jane Doe",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });
});

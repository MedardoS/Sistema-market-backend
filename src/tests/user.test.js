import request from "supertest";

import app from "../app.js";

describe("API USERS", () => {

  test(
    "GET / debe responder 200",
    async () => {

      const response =
        await request(app).get("/");

      expect(response.statusCode)
        .toBe(200);

    }
  );

});
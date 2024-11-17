const request = require("supertest");
const http = require("http");
const { app } = require("../index");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API ENDPOINT TESTS", () => {
  it("GET /v1/api/categories should be able to return status code 200", async () => {
    let res = await request(server).get("/v1/api/categories");
    expect(res.status).toEqual(200);
  });

  it("POST /v1/api/categories should be able to add category in categories", async () => {
    let res = await request(server)
      .post("/v1/api/categories")
      .send({ category_name: "Technology" });
    expect(res.status).toEqual(201);
  });

  it("GET /v1/api/question should be able to return status code 200", async () => {
    let res = await request(server).get("/v1/api/questions");
    expect(res.status).toEqual(200);
  });

  it("POST /v1/api/questions should be able to add question, return status code 201", async () => {
    let res = await request(server).post("/v1/api/questions").send({
      question_text: "What is Nodejs?",
      master_id: 1,
    });
    expect(res.status).toEqual(201);
  });

  it("PUT /v1/api/questions/:id should be able to update details of specified id return status code 200", async () => {
    let res = await request(server).put("/v1/api/questions/4").send({
      question_text: "What is Nodejs?",
      master_id: 1,
    });
    expect(res.status).toEqual(200);
  });

  it("DELETE /v1/api/questions/:id should be able to delete data of specified id and return status code 200", async () => {
    let res = await request(server).delete("/v1/api/questions/4");
    expect(res.status).toEqual(200);
  });
});

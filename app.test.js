const request = require("supertest");
const app = require("./app");

describe("Check Redirects API Testing" , ()=>{
    it('GET /ping', ()=>{
        return request(app)
        .get("/ping")
        .expect(200)
    })
});
const request = require('supertest');
const app = require('../app');
const Directors = require('../models/Directors');
require("../models");


let directorId

test("POST /directors should create a director", async()=>{
    const newDirector = {
        firstName: "George",
         lastName: "Lucas",
         nationality: "American",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/George_Lucas_cropped_2009.jpg/251px-George_Lucas_cropped_2009.jpg",
         birthday: "05/14/1944"
    }
    const res = await request(app)
    .post("/directors")
    .send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test("GET /directors should return all the director", async()=>{
    const res = await request(app).get("/directors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    // expect(res.body[0].?).toBeDefined();
});

test("GET /directors/:id should return one director", async() => {
    const res = await request(app).get(`/directors/${directorId}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("George")
});

test("PUT /directors/:id should update one director", async()=>{
    const body = {
        firstName: "George",
         lastName: "Lucas",
         nationality: "American",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/George_Lucas_cropped_2009.jpg/251px-George_Lucas_cropped_2009.jpg",
         birthday: "05/14/1944"
    }
    const res = await request(app)
    .put(`/directors/${directorId}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});


test("DELETE /directors/:id should delete one director", async()=>{
    const res = await request(app).delete(`/directors/${directorId}`)
    console.log(res.body)
    expect(res.status).toBe(204);
});
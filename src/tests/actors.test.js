const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
require("../models");


let actorId

test("POST /actors should create a actor", async()=>{
    const newActor = {
        firstName: "ToMark",
        lastName: "Hamillm",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Mark_Hamill_by_Gage_Skidmore_2.jpg/220px-Mark_Hamill_by_Gage_Skidmore_2.jpg",
        birthday: "09/25/1951"
    }
    const res = await request(app)
    .post("/actors")
    .send(newActor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName);
});

test("GET /actors should return all the actor", async()=>{
    const res = await request(app).get("/actors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    // expect(res.body[0].?).toBeDefined();
});

test("PUT /actors/:id should update one actor", async()=>{
    const body = {
        firstName: "ToMark",
        lastName: "Hamillm",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Mark_Hamill_by_Gage_Skidmore_2.jpg/220px-Mark_Hamill_by_Gage_Skidmore_2.jpg",
        birthday: "09-25-1951"
    }
    const res = await request(app)
    .put(`/actors/${actorId}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});


test("DELETE /actors/:id should delete one actor", async()=>{
    const res = await request(app).delete(`/actors/${actorId}`)
    console.log(res.body)
    expect(res.status).toBe(204);
});
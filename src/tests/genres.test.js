const request = require('supertest');
const app = require('../app');
const Genres = require('../models/Genres');
require("../models");


let genresId

test("POST /genres should create a genre", async()=>{
    const newGenre = {
        name: "Adventure"
    }
    const res = await request(app)
    .post("/genres")
    .send(newGenre);
    genresId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGenre.name);
});

test("GET /genres should return all the genre", async()=>{
    const res = await request(app).get("/genres");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    // expect(res.body[0].?).toBeDefined();
});

test("PUT /genres/:id should update one genre", async()=>{
    const body = {
        name: "Adventure"
    }
    const res = await request(app)
    .put(`/genres/${genresId}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});


test("DELETE /genres/:id should delete one genre", async()=>{
    const res = await request(app).delete(`/genres/${genresId}`)
    console.log(res.body)
    expect(res.status).toBe(204);
});
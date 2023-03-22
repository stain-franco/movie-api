const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');
const Movies = require('../models/Movies');
require("../models");


let movieId

test("POST /movies should create a movie", async()=>{
    const newMovie = {
         name: "Star Wars",
         image: "https://static.wikia.nocookie.net/esstarwars/images/0/0f/Phantom_Menace_Soundtrack.jpg/revision/latest?cb=20090122212843",
         synopsis: "Popcorn pictures hit hyperdrive after George Lucas unveiled his intergalactic Western, an intoxicating gee-whiz space opera with dollops of Joseph Campbell–style mythologizing that obliterated the moral complexities of 1970s Hollywood. This postmodern movie-brat pastiche references a virtual syllabus of genre classics, from Metropolis and Triumph of the Will to Kurosawa’s samurai actioners, Flash Gordon serials and WWII thrillers like The Dam Busters. Luke Skywalker’s quest to rescue a princess instantly elevated B-movie bliss to billion-dollar-franchise sagas.—Stephen Garrett",
         releaseYear: 1977
    }
    const res = await request(app)
    .post("/movies")
    .send(newMovie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
});

test("GET /movies should return all the movie", async()=>{
    const res = await request(app).get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    // expect(res.body[0].?).toBeDefined();
});

test("PUT /movies/:id should update one movie", async()=>{
    const body = {
        name: "Star Wars",
        image: "https://static.wikia.nocookie.net/esstarwars/images/0/0f/Phantom_Menace_Soundtrack.jpg/revision/latest?cb=20090122212843",
        synopsis: "Popcorn pictures hit hyperdrive after George Lucas unveiled his intergalactic Western, an intoxicating gee-whiz space opera with dollops of Joseph Campbell–style mythologizing that obliterated the moral complexities of 1970s Hollywood. This postmodern movie-brat pastiche references a virtual syllabus of genre classics, from Metropolis and Triumph of the Will to Kurosawa’s samurai actioners, Flash Gordon serials and WWII thrillers like The Dam Busters. Luke Skywalker’s quest to rescue a princess instantly elevated B-movie bliss to billion-dollar-franchise sagas.—Stephen Garrett",
        releaseYear: 1977
    }
    const res = await request(app)
    .put(`/movies/${movieId}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("POST /movies/:id/actors should set the movies actors", async()=>{
    const actor = await Actors.create({
        firstName: "ToMark",
        lastName: "Hamillm",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Mark_Hamill_by_Gage_Skidmore_2.jpg/220px-Mark_Hamill_by_Gage_Skidmore_2.jpg",
        birthday: "09/25/1951"
    })
    const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors should set the movies directors", async()=>{
    const director = await Directors.create({
        firstName: "George",
         lastName: "Lucas",
         nationality: "American",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/George_Lucas_cropped_2009.jpg/251px-George_Lucas_cropped_2009.jpg",
         birthday: "05/14/1944"
    })
    const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres should set the movies genres", async()=>{
    const genre = await Genres.create({
        name: "Adventure"
    })
    const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});


test("DELETE /movies/:id should delete one movies", async()=>{
    const res = await request(app).delete(`/movies/${movieId}`)
    console.log(res.body)
    expect(res.status).toBe(204);
});
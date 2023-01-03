import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
// import index from "../index.js";
import { app } from "../index.js";

// This allows us load the enviroment variables
dotenv.config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

// Test get notes endpoints
describe("GET /api/notes", () => {
  it("it should return all the notes", async () => {
    const res = await request(app).get("/api/notes");
    expect(res.statusCode).toBe(200);
  });
});

//Test create notes endpoints

describe("POST /api/notes", () => {
  it("it should create a new note", async () => {
    const body = {
      title: "This is my title",
      description: "This is my description",
    };
    const res = await request(app).post("/api/notes").send(body);
    expect(res.statusCode).toBe(201);
    expect(res.body.notes.title).toBe("This is my title");
  });
});

describe("PUT /api/notes/:id", () => {
  it("It should update the note with the parameter id", async () => {
    const res = await request(app)
      .put("/api/notes/63b3230e594d859e65712527")
      .send({
        title: "I am an updated hello title",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.updateNoteData.title).toBe("I am an updated hello title");
  });
});

describe("DELETE /api/delete/:id", () => {
  it("it should delete the note with the passed in id", async () => {
    const res = await request(app).delete(
      "/api/notes/63b3230e594d859e65712527"
    );
    expect(res.statusCode).toBe(200);
  });
});

import { Router } from "express";
import { createNote, getAllNotes } from "../controller/notes.js";

const notesRouter = Router();

notesRouter.get("/", getAllNotes);
notesRouter.post("/", createNote);

export { notesRouter };

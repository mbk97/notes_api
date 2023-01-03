import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controller/notes.js";

const notesRouter = Router();

notesRouter.get("/", getAllNotes);
notesRouter.post("/", createNote);
notesRouter.put("/:id", updateNote);
notesRouter.delete("/:id", deleteNote);

export { notesRouter };

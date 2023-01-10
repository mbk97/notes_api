import { Router } from "express";
import { protect } from "../auth/verifyToken.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controller/notes.js";

const notesRouter = Router();

notesRouter.get("/", protect, getAllNotes);
notesRouter.post("/", protect, createNote);
notesRouter.put("/:id", protect, updateNote);
notesRouter.delete("/:id", protect, deleteNote);

export { notesRouter };

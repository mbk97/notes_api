import { Router } from "express";
import { protect } from "../auth/verifyToken.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getUnarchivedNotes,
  updateNote,
} from "../controller/notes.js";

const notesRouter = Router();

notesRouter.get("/", protect, getAllNotes);
notesRouter.get("/archived", protect, getUnarchivedNotes);
notesRouter.post("/", protect, createNote);
notesRouter.put("/:id", protect, updateNote);
notesRouter.delete("/:id", protect, deleteNote);

export { notesRouter };

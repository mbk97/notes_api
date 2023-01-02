import Notes from "../model/notes.js";
import { createNoteSchema } from "../utils/validation.js";

const getAllNotes = async (req, res) => {
  const notes = await Notes.find();

  if (notes) {
    res.status(200).json({
      notes: notes,
    });
  } else {
    res.status(400).json({
      message: "Error getting notes",
    });
  }
};

const createNote = async (req, res) => {
  const { title, description } = req.body;
  const { error } = createNoteSchema.validate(req.body);

  if (error) {
    res.status(400).send(error?.details[0]?.message);
  }

  try {
    const userNote = await Notes.create({
      title: title,
      description: description,
    });

    if (userNote) {
      res.status(200).json({
        message: "Note created successfully",
        notes: userNote,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export { getAllNotes, createNote };

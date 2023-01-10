import Notes from "../model/notes.js";
import { createNoteSchema } from "../utils/validation.js";
import User from "../model/user.js";

const getAllNotes = async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });

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
      user: req.user.id,
    });

    if (userNote) {
      res.status(201).json({
        message: "Note created successfully",
        note: {
          id: userNote._id,
          title: userNote.title,
          description: userNote.description,
          user: userNote.user,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = await Notes.findById(req.params.id);
    if (!noteId) {
      res.status(400).json({
        message: "Note does not exist",
      });
    }

    // find the user
    const user = await User.findById(req.user.id);

    // make sure the loggedin user matches the note user
    if (!noteId.user !== user.id) {
      res.status(400).json({
        message: "User not found",
      });
    }

    const updateNoteData = await Notes.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Note updated",
      updateNoteData,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = await Notes.findById(req.params.id);

    if (!noteId) {
      res.status(400).json({
        message: "Not does not exist",
      });
      return;
    }

    await Notes.findByIdAndDelete(noteId);
    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export { getAllNotes, createNote, updateNote, deleteNote };

import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import { notesRouter } from "./routes/notes.js";
import { parser, storage } from "./config/cloudinary.js";
import profileImage from "./model/profileImage.js";
import { protect } from "./auth/verifyToken.js";
import { getUserImgRouter } from "./routes/userImg.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/images", protect, parser.single("image"), async (req, res) => {
  try {
    if (res.statusCode === 200) {
      const createImg = await profileImage.create({
        email: req.user.email,
        image: req.file.path,
      });

      res.status(200).json({
        message: "Image added successfully",
        pofileImg: {
          image: createImg.image,
          id: createImg.id,
          user: createImg.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/notes/auth", authRouter);
app.use("/api/notes", notesRouter);
app.use("/api/images", getUserImgRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export { app };

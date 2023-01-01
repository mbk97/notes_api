import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { connectDB } from "./config/db.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/notes", authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
import { Router } from "express";
import { protect } from "../auth/verifyToken.js";
import { getUserImage, uploadUserImage } from "../controller/userImage.js";
import { parser } from "../config/cloudinary.js";

const userImgRouter = Router();
userImgRouter.post("/upload", protect, parser.single("image"), uploadUserImage);
userImgRouter.get("/profile-img", protect, getUserImage);

export { userImgRouter };

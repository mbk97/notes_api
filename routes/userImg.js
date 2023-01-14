import { Router } from "express";
import { protect } from "../auth/verifyToken.js";
import { getUserImage } from "../controller/userImage.js";

const getUserImgRouter = Router();

getUserImgRouter.get("/get-profile-img", protect, getUserImage);

export { getUserImgRouter };

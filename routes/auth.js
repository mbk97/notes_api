import { Router } from "express";
import { login, register, updateProfile } from "../controller/user.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.put("/:id", updateProfile);

export { authRouter };

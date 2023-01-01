import { Router } from "express";
import { login, register } from "../controller/user.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

export { authRouter };

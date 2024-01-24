import { Router } from "express";
import { userController } from "../controllers/UserController";

const userRoutes = Router();

userRoutes.get("/", userController.list);

export { userRoutes };


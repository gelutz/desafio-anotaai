import { Router } from "express";
import { authController } from "../controllers/AuthController";

const routes = Router();
routes.post("/login", authController.login);

export { routes as authRoutes };

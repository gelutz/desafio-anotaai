import { Router } from "express";
import { categoryController } from "../controllers/CategoryController";

const categoryRoutes = Router();

categoryRoutes.get("/", categoryController.list);
categoryRoutes.post("/", categoryController.create);

export { categoryRoutes };

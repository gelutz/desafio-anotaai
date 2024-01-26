import { Router } from "express";
import { fileUploadController } from "../controllers/FileUploadController";

const fileRoutes = Router();

fileRoutes.get("/", fileUploadController.list);

export { fileRoutes };

import { Router } from "express";
import { fileUploadController } from "../controllers/FileUploadController";

const fileRoutes = Router();

fileRoutes.get("/", fileUploadController.list);
fileRoutes.get("/q", fileUploadController.message);
fileRoutes.get("/qr", fileUploadController.seeMessage);

export { fileRoutes };

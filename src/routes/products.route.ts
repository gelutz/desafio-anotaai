import { Router } from "express";
import ProductController from "../controllers/ProductController";

const productRoutes = Router();

productRoutes.get("/", ProductController.list);

export { productRoutes };

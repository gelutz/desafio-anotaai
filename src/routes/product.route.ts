import { Router } from "express";
import { productController } from "../controllers/ProductController";

const productRoutes = Router();

productRoutes.get("/", productController.list);
productRoutes.post("/", productController.create);

export { productRoutes };

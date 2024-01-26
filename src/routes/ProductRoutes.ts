import { Router } from "express";
import { productController } from "../controllers/ProductController";

const productRoutes = Router();

productRoutes.get("/", productController.list);
productRoutes.post("/", productController.create);
productRoutes.put("/:id", productController.update);
productRoutes.delete("/:id", productController.delete);

export { productRoutes };

import { Router } from "express";
import { productRoutes } from "./products.route";

const routes = Router();

routes.get("/", (_, res) => res.send("OK"));
routes.use("/products", productRoutes);

export { routes };

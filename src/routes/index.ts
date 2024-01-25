import { Router } from "express";
import { bearerAuth } from "../middlewares/BearerAuth";
import { authRoutes } from "./auth.route";
import { categoryRoutes } from "./category.route";
import { productRoutes } from "./product.route";
import { userRoutes } from "./user.route";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/products", [bearerAuth], productRoutes);
routes.use("/users", [bearerAuth], userRoutes);
routes.use("/categories", [bearerAuth], categoryRoutes);

export { routes };

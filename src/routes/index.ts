import { Router } from "express";
import { bearerAuth } from "../middlewares/BearerAuth";
import { authRoutes } from "./AuthRoutes";
import { categoryRoutes } from "./CategoryRoutes";
import { productRoutes } from "./ProductRoutes";
import { userRoutes } from "./UserRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/products", [bearerAuth], productRoutes);
routes.use("/users", [bearerAuth], userRoutes);
routes.use("/categories", [bearerAuth], categoryRoutes);

export { routes };

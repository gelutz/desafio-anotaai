import { Product } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../interfaces/Prisma";
import { CreateProduct, ProductService } from "../services/ProductService";

class ProductController {
    productService = new ProductService(prisma);

    list = async (_: Request, res: Response): Promise<Response<Product>> => {
        const products: Product[] = await this.productService.listAll();

        return res.status(200).send(products);
    };

    create = async (req: Request, res: Response): Promise<Response> => {
        const data: CreateProduct = { ...req.body };

        const newProduct = await this.productService.create(data);

        return res.status(201).send(newProduct);
    };
}

export const productController = new ProductController();

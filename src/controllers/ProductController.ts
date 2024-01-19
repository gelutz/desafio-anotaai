import { Product } from "@prisma/client";
import { Request, Response } from "express";
import { ProductCreateType, ProductService } from "../services/ProductService";

class ProductController {
    productService = new ProductService();

    list = async (_: Request, res: Response): Promise<Response<Product>> => {
        const products: Product[] = await this.productService.listAll();

        return res.status(200).send(products);
    };

    create = async (req: Request, res: Response): Promise<Response> => {
        const data: ProductCreateType = { ...req.body };

        const newProduct = await this.productService.create(data);

        return res.status(201).send(newProduct);
    };
}

export default new ProductController();

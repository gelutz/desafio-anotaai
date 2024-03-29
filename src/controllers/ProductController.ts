import { Product } from "@prisma/client";
import { Request, Response } from "express";
import { CreateProduct, productService } from "../services/ProductService";

class ProductController {
    productService = productService;

    list = async (_: Request, res: Response): Promise<Response<Product>> => {
        const products = await this.productService.list();

        if (!products) {
            return res.status(404).send();    
        }
        
        return res.status(200).send(products);
    };

    create = async (req: Request, res: Response): Promise<Response> => {
        const data: CreateProduct = { ...req.body };

        const newProduct = await this.productService.create(data);

        return res.status(201).send(newProduct);
    };

    update = async (req: Request, res: Response): Promise<Response> => {
        const data: CreateProduct = { ...req.body };
        const { id } = req.params;

        const updatedProduct = await this.productService.update(id, data);

        return res.status(201).send(updatedProduct);
    };

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        await this.productService.delete(id);

        return res.status(201);
    };
}

export const productController = new ProductController();

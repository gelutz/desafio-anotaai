import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { categoryService } from "../services/CategoryService";
import { productService } from "../services/ProductService";

class FileUploadController {
    categoryService = categoryService;

    list = async (_: Request, res: Response): Promise<Response<Category>> => {
        productService.listItems();
        return res.status(200).send();
    };
}

export const fileUploadController = new FileUploadController();

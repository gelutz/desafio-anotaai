import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { CreateCategory, categoryService } from "../services/CategoryService";

class CategoryController {
    categoryService = categoryService;

    list = async (_: Request, res: Response): Promise<Response<Category>> => {
        const Categorys: Category[] = await this.categoryService.listAll();

        return res.status(200).send(Categorys);
    };

    create = async (req: Request, res: Response): Promise<Response> => {
        const data: CreateCategory = { ...req.body };

        const newCategory = await this.categoryService.create(data);

        return res.status(201).send(newCategory);
    };
}

export const categoryController = new CategoryController();

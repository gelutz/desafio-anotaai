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

    update = async (req: Request, res: Response): Promise<Response> => {
        const data: CreateCategory = { ...req.body };
        const { id } = req.params;

        const updatedProduct = await this.categoryService.update(id, data);

        return res.status(201).send(updatedProduct);
    };

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        await this.categoryService.delete(id);

        return res.status(201);
    };
}

export const categoryController = new CategoryController();

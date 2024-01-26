import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { categoryService } from "../services/CategoryService";
import { s3Service } from "../services/S3Service";

class FileUploadController {
    categoryService = categoryService;

    list = async (_: Request, res: Response): Promise<Response<Category>> => {
        const teste = await s3Service.checkBucket();
        console.log(teste);

        return res.status(200).send(teste);
    };
}

export const fileUploadController = new FileUploadController();

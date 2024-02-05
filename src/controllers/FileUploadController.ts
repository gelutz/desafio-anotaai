import { Message } from "@aws-sdk/client-sqs";
import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { categoryService } from "../services/CategoryService";
import { qService } from "../services/QService";
import { s3Service } from "../services/S3Service";

class FileUploadController {
    categoryService = categoryService;

    list = async (_: Request, res: Response): Promise<Response<Category>> => {
        const teste = await s3Service.checkBucket();
        console.log(teste);

        return res.status(200).send(teste);
    };

    message = async (_: Request, res: Response): Promise<Response<string>> => {
        return res.send(await qService.sendMessage());
    };

    seeMessage = async (_: Request, res: Response): Promise<Response<Message[] | undefined>> => {
        return res.send(await qService.getMessages());
    };
}

export const fileUploadController = new FileUploadController();

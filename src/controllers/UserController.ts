import { User } from "@prisma/client";
import { Request, Response } from "express";
import { userService } from "../services/UserService";

class UserController {
    list = async (_: Request, res: Response): Promise<Response> => {
        const users: User[] = await userService.listAll();

        return res.status(200).send(users);
    };
}

export const userController = new UserController();

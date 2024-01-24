import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { userService } from "../services/UserService";
import { getAccessToken } from "../utils/Token";

class AuthController {
    userService = userService;

    login = async (req: Request, res: Response): Promise<Response> => {
        const { login, password } = req.body;

        const user = await this.userService.getByLogin(login);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(404).send({ message: "Invalid password" });
        }

        const accessToken = await getAccessToken({ login });

        res.set("Authorization", accessToken);
        return res.status(200).send({ accessToken, login });
    };
}

export const authController = new AuthController();

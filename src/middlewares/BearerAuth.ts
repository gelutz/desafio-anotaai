import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const messages = {
    notAuthorized: "Não está autorizado",
    tokenExpired: "O token está expirado. Tente fazer login novamente",
    tokenError: "Houve um erro com o seu token. Tente fazer login novamente",
};

export function bearerAuth(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (typeof authorization != "string") {
        return res.status(401).send({ message: messages.notAuthorized });
    }

    const token = authorization.replace("Bearer ", "");

    if (token === "") {
        return res.status(401).send({ message: messages.notAuthorized });
    }

    try {
        jwt.verify(token, process.env.JWT_KEY as string);
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            if (err.message.includes("expired")) {
                return res.status(401).send({ message: messages.tokenExpired });
            }

            if (err.message.includes("malformed")) {
                return res.status(401).send({ message: messages.notAuthorized });
            }

            return res.status(401).send({ message: messages.tokenError });
        }
    }

    next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
        bearerAuth(req, res, next);
    } else {
        next();
    }
}

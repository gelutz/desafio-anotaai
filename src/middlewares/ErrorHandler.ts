import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, _: NextFunction): void => {
    // erros mais específicos devem ficar acima desse
    if (err instanceof Error) {
        console.error(err);
        res.status(500).send({ errors: [{ message: "Something went wrong" }] });
    }
};

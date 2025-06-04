import { Request, Response } from "express";

export const helloMessage = (_req: Request, res: Response): void => {
    res.status(200).json({ message: "Hello from the API!" });
};

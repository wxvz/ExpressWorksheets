import { Request, Response, NextFunction } from 'express';

export const routeLogging = (req: Request, _res: Response, next: NextFunction): void => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};
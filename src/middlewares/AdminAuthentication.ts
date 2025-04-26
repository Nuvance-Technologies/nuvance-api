import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_ADMIN_SECRET } from "../config";

export const AdminAuth = (req: Request, res: Response, next: NextFunction) => {
    // Try to get token from cookies or Authorization header
    let token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({
            message: "Unauthorized: No token provided"
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET) as {
            id: string; email: string
        };
        
        (req as any).admin = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token"
        });
        return;
    }
};
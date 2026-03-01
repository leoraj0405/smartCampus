import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'nkasbfiuwh92u93u023joiwnijdsbsfibufeyisasjwn938yy9fhnijsfbiw48rhbbjdb3274829IHjaieb8HJABHJIBJIqbdjiwbdia';

type AugmentedRequest = Request & { user?: object | null };

export function authenticateToken(req: AugmentedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

    if (token == null) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as object | string;
        req.user = typeof decoded === 'object' ? decoded : { value: decoded };
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from '../utils/constants.js';

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
    return token;
};

// Verify token middleware
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[COOKIE_NAME];

    console.log('Token:', token);

    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "No token received" });
    }

    try {
        const decoded = await new Promise<any>((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

        console.log("Token verification successful:", decoded);
        res.locals.jwtData = decoded;
        next();
    } catch (error) {
        console.log("Token verification failed:", error);
        return res.status(401).json({ message: "Token verification failed", cause: error.message });
    }
};

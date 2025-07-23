import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { APIError } from './apiErr';
import { TOKEN } from './constants';

interface Claims {
    email: string;
    is_client: boolean;
    iat: number;
    exp: number;
}

export async function guard(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw APIError.err('No auth token found', 400, 40);
        }

        const token = authHeader.split(' ')[1];
        const claims = jwt.verify(token, TOKEN) as Claims;

        const user = await prisma.user.findUnique({
            where: { email: claims.email.toLowerCase() },
        });

        if (!user) {
            throw APIError.err('Unauthorized', 401, 41);
        }

        (req as any).identity = user;

        next();
    } catch (err) {
        if (err instanceof APIError) return err.toResponse(res);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function verifyAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw APIError.err('No auth token found', 400, 40);
        }

        const token = authHeader.split(' ')[1];
        const claims = jwt.verify(token, TOKEN) as Claims;

        const user = await prisma.user.findUnique({
            where: { email: claims.email.toLowerCase() },
        });

        if (!user) {
            throw APIError.err('Unauthorized', 401, 41);
        }

        (req as any).identity = user;

        const path = req.path;

        if (path === '/barber/dashboard') {
            if (!user.isClient) return next();
            throw APIError.err('Forbidden', 403, 43);
        }

        if (path === '/client/dashboard') {
            if (user.isClient) return next();
            throw APIError.err('Forbidden', 403, 43);
        }

        return next();
    } catch (err) {
        if (err instanceof APIError) return (err as APIError).toResponse(res);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

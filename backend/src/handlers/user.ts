import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN || 'default_secret';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, is_client } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                status_code: 409,
                error_code: 49,
                message: 'User already exists.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const uuid = crypto.randomUUID();

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isClient: is_client,
                isActive: true,
                uuid,
            },
        });

        return res.status(200).json({ message: 'User created successfully!' });
    } catch (err: any) {
        return res.status(500).json({
            status_code: 500,
            error_code: 50,
            message: err.message || 'Internal server error',
        });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({
                status_code: 404,
                error_code: 44,
                message: "User doesn't exist. Email or password incorrect.",
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(404).json({
                status_code: 404,
                error_code: 44,
                message: "User doesn't exist. Email or password incorrect.",
            });
        }

        const token = jwt.sign(
            {
                email: user.email,
                is_client: user.isClient,
            },
            TOKEN_SECRET,
            { expiresIn: '30d' }
        );

        return res.json({ token });
    } catch (err: any) {
        return res.status(500).json({
            status_code: 500,
            error_code: 50,
            message: err.message || 'Internal server error',
        });
    }
};

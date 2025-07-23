import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const updateUser = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const { name } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { uuid } });

        if (!user) {
            return res.status(404).json({
                status_code: 404,
                error_code: 44,
                message: 'User not found.',
            });
        }

        await prisma.user.update({
            where: { uuid },
            data: { name },
        });

        return res.json({ message: 'User name updated!' });
    } catch (err: any) {
        return res.status(500).json({
            status_code: 500,
            error_code: 50,
            message: err.message || 'Internal server error',
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { uuid } = req.params;

    try {
        const user = await prisma.user.findUnique({ where: { uuid } });

        if (!user) {
            return res.status(404).json({
                status_code: 404,
                error_code: 44,
                message: 'User not found.',
            });
        }

        await prisma.user.delete({ where: { id: user.id } });

        return res.json({ message: 'Deleted!' });
    } catch (err: any) {
        return res.status(500).json({
            status_code: 500,
            error_code: 50,
            message: err.message || 'Internal server error',
        });
    }
};

export const deleteAllUsers = async (_req: Request, res: Response) => {
    try {
        const count = await prisma.user.count();
        if (count === 0) {
            return res.status(404).json({
                status_code: 404,
                error_code: 44,
                message: 'No users in DB.',
            });
        }

        await prisma.user.deleteMany();

        return res.json({ message: 'All users got deleted!' });
    } catch (err: any) {
        return res.status(500).json({
            status_code: 500,
            error_code: 50,
            message: err.message || 'Internal server error',
        });
    }
};

export const fetchAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        return res.json(users);
    } catch (err: any) {
        return res.status(500).json({
            status_code: 500,
            error_code: 50,
            message: err.message || 'Internal server error',
        });
    }
};

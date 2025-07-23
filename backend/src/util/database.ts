import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
    return prisma;
}

export default prisma;

import { createServer } from 'http';
import app from './app';
import { connectDatabase } from './util/database';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';

async function main() {
    const db = await connectDatabase();

    app.use((req, res, next) => {
        (req as Request & { db: PrismaClient }).db = db;
        next();
    });

    const PORT = 3000;
    createServer(app).listen(PORT, () => {
        console.log(`Server running on: http://localhost:${PORT}`);
    });
}

main().catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});

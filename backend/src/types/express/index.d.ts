import { PrismaClient } from "../../generated/prisma";

// declare global {
//     namespace Express {
//         interface Request {
//             db: PrismaClient;
//         }
//     }
// }

declare module 'express-serve-static-core' {
    interface Request {
        db: PrismaClient;
    }
}
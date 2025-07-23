import dotenv from 'dotenv';

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL!;
export const TOKEN = process.env.TOKEN!;

import express from 'express';
import cors from 'cors';
import { createUser, loginUser } from '../handlers/user';

const userRouter = express.Router();

const corsOptions = {
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

userRouter.use(cors(corsOptions));

userRouter.post('/user/register', createUser);
userRouter.post('/user/login', loginUser);

export default userRouter;

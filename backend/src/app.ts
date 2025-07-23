import express from 'express';
import cors from 'cors';
import admRouter from './routes/admin';
import barbRouter from './routes/barber';
import userRouter from './routes/user';

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/admin', admRouter);
app.use('/barber', barbRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Backend rodando com sucesso.');
});

export default app;

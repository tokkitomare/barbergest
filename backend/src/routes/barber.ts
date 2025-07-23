import { Request, Response, Router } from 'express';
import cors from 'cors';
import { verifyAuth } from '../util/guards';
import { addEvent, viewEvents } from '../handlers/barber';


const barbRouter = Router();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

barbRouter.use(cors(corsOptions));

barbRouter.post('/event/:event', addEvent);
barbRouter.get('/view/event/:event', viewEvents);

barbRouter.use(verifyAuth);

barbRouter.get('/barber/dashboard', (_: Request, res: Response) => res.sendStatus(200));
barbRouter.get('/client/dashboard', (_: Request, res: Response) => res.sendStatus(200));

export default barbRouter;

import express from 'express';
import { updateUser, deleteAllUsers, deleteUser, fetchAllUsers } from '../handlers/admin';
import { guard } from '../util/guards';

const admRouter = express.Router();

admRouter.use(guard);

admRouter.put('/user/:uuid/update', updateUser);
admRouter.delete('/user/all/delete', deleteAllUsers);
admRouter.delete('/user/:uuid/delete', deleteUser);
admRouter.get('/user/all', fetchAllUsers);

export default admRouter;

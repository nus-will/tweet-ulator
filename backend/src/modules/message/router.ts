import { Router } from 'express';
import { list, create } from './handler';

const messagesRouter = Router();

messagesRouter.get('/', list);
messagesRouter.post('/', create);

export default messagesRouter;
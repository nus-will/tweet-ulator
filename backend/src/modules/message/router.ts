import { Router } from 'express';
import { list, create, createFirstMessage } from './handler';

const messagesRouter = Router();

messagesRouter.get('/', list);
messagesRouter.post('/', create);
messagesRouter.post('/create-first-message', createFirstMessage);

export default messagesRouter;
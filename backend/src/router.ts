import messagesRouter from './modules/message/router';
import { Router } from 'express';

const router = Router();

router.use('/messages', messagesRouter);

export default router;
import { Request, Response } from 'express';
import * as repo from './repository';

const create = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const message = await repo.create(req.body);
    res.json({
      message
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message
    })
  }

}

const createFirstMessage = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const message = await repo.createFirstMessage(req.body);
    res.json({
      message
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message
    })
  }

}

const list = async (req: Request, res: Response) => {
  try {
    const messages = await repo.list();
    res.json({
      messages
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    })
  }

}

export {
  create,
  list,
  createFirstMessage
}
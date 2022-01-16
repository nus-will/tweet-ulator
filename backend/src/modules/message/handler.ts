import { Request, Response } from 'express';
import * as repo from './repository';

const create = async (req: Request, res: Response) => {

}

const list = async (req: Request, res: Response) => {
  res.json({
    hello: 'world'
  })
}

export {
  create,
  list
}
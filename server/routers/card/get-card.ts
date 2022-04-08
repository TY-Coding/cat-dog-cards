import {
  Request,
  Response,
} from 'express';
import {
  CardModel,
} from '../../models/card';

export default async function (_req: Request, res: Response) {
  try {
    const cardCount: number = await CardModel.count();
    const luckyNum: any = Math.floor(Math.random() * cardCount) + 1;

    const cardFound: any = await CardModel.findById(luckyNum);

    res.json({ data: cardFound });
  } catch (e) {
    console.error(e);
  }
}
import {
  Request,
  Response,
} from 'express';
import {
  CardModel,
} from '../../models/card';

/**
 * @api {get} /api/card Get random card
 * @apiName GetCard
 * @apiGroup Card
 *
 * @apiSuccess {Object} data card object
 * @apiSuccess {String} data.imageName path of image on s3
 * @apiSuccess {Object[]} data.description description of image
 * @apiSuccessExample {json} Success-Response:
 * {
 *    data: {
 *      imageName: "5a7c9181-76ff-49b2-862d-f990c7d50557.jpg",
 *      description: "This is dog"
 *    }
 * }
 * 
 */

export default async function (_req: Request, res: Response) {
  try {
    const cardCount: number = await CardModel.count();
    const luckyNum = Math.floor(Math.random() * cardCount) + 1;

    const cardFound: any = await CardModel.findById(luckyNum);

    res.json({ data: cardFound });
  } catch (e) {
    console.error(e);
  }
}
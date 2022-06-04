import {
  Request,
  Response,
} from 'express';
import aws from 'aws-sdk';
import {
  CardModel,
} from '../../models/card';
import Joi from 'joi';

aws.config.update({
  secretAccessKey: process.env.AWS_SK,
  accessKeyId: process.env.AWS_AK,
});

const s3 = new aws.S3();

/**
 * @api {post} /api/cards List card
 * @apiName ListCard
 * @apiGroup Card
 *
 * @apiQuery {Number} page page of requested cards
 *
 * @apiSuccess {Object} data list of cards
 * @apiSuccessExample {json} Success-Response:
 * {
 *    {
        "imageName": "6c0cceaf-cdf1-489e-9628-684bd8594aa9.jpg",
        "description": "再大的世界 都會有一個自己的小小森林"
    },
    {
        "imageName": "ad5740f3-eac1-4d98-a77a-00d03e6532a2.jpg",
        "description": "奔馳在自己的人生賽道上 創造屬於自己的路"
    }, {...}
 * }
 *
 * @apiUse validatedError
 */

export default async function (req: Request, res: Response) {
  try {
    const schema: Joi.ObjectSchema = Joi.object({
      page: Joi.number().required(),
    });

    const validated = schema.validate(req.query);

    if (validated.error) {
      return res.status(422).json({
        error: validated.error.message,
        detail: validated.error.details,
      });
    }

    const page: number = parseInt(req.query.page as string);
    const amount: number = 10;

    const startNum: number = (page - 1) * amount + 1;
    const endNum: number = page * amount;
    const cards = await CardModel.find({
      $and: [
        { _id: { $gte: startNum } },
        { _id: { $lte: endNum } },
      ]
    });

    res.json(cards);
  } catch (e) {
    console.error(e);
  }
}
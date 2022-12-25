import {
  Request,
  Response,
} from 'express';
import Joi from 'joi';
import {
  CardModel,
} from '../../models/card';

/**
 * @api {delete} /api/card/:cardId Delete one card
 * @apiName DeleteCard
 * @apiGroup Card
 * 
 * @apiParam {Number} cardId id of card
 *
 * @apiSuccess {Object} cardDeleted deleted card data
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "cardDeleted": {
 *      "imageName": "1b78be1b-2086-4213-ab35-20bfa8d2914f.jpg",
 *      "description": "一起玩樂囉  我跑跑你追追！"
 *    }
 * }
 * 
 * @apiUse validatedError 
 * @apiUse cardNotFoundError 
 */

export default async function (req: Request, res: Response) {
  try {
    const schema: Joi.ObjectSchema = Joi.object({
      cardId: Joi.number().required(),
    });

    const validated = schema.validate(req.params, {
      abortEarly: false,
    });
  
    if (validated.error) {
      return res.status(422).json({
        error: validated.error.message,
        detail: validated.error.details,
      });
    }

    const cardId: number = parseInt(req.params.cardId);

    const cardDeleted: any = await CardModel.findByIdAndUpdate(
      cardId,
      { $set: { deleted: true }},
    );

    if (!cardDeleted) {
      return res.status(404).json({
        message: 'Card Not Found',
      });
    }

    res.json({ cardDeleted });
  } catch (e) {
    console.error(e);
  }
}
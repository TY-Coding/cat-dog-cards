import {
  Request,
  Response,
} from 'express';
import Joi from 'joi';
import {
  CardModel,
} from '../../models/card';

/**
 * @api {patch} /api/card/:cardId Cancel delete one card
 * @apiName CancelDeleteCard
 * @apiGroup Card
 * 
 * @apiParam {Number} cardId id of card
 *
 * @apiSuccess {Object} cardCancelDeleted cancel deleted card data
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "cardCancelDeleted": {
 *        "imageName": "0782a01f-7cb8-4097-a59a-f2cbb287e374.JPG",
 *        "description": "陪窩彼此 安心休息"
 *      }
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

    const cardCancelDeleted: any = await CardModel.findByIdAndUpdate(
      cardId,
      { $set: { deleted: false }},
    );

    if (!cardCancelDeleted) {
      return res.status(404).json({
        message: 'Card Not Found',
      });
    }

    res.json({ cardCancelDeleted });
  } catch (e) {
    console.error(e);
  }
}
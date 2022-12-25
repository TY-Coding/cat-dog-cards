import {
  Request,
  Response,
} from 'express';
import Joi from 'joi';
import {
  CardModel,
} from '../../models/card';

/**
 * @api {post} /api/cards Delete many card
 * @apiName DeleteManyCard
 * @apiGroup Card
 *
 * @apiBody {String} action
 * @apiBody {Number[]} cardIds
 *
 * @apiSuccess {Object} message success message
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "message": "undelete success"
 * }
 *
 * @apiUse validatedError 
 */

export default async function (req: Request, res: Response) {
  try {
    const schema: Joi.ObjectSchema = Joi.object({
      action: Joi.string().valid('delete', 'undelete').required(),
      cardIds: Joi.array().items(Joi.number()).required(),
    });

    const validated = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validated.error) {
      return res.status(422).json({
        error: validated.error.message,
        detail: validated.error.details,
      });
    }

    const cardIds: number[] = req.body.cardIds;
    const deleteFilter: any = {
      _id: {
        $in: cardIds,
      },
    };

    const action: string = req.body.action;
    let update: any = {};
    switch (action) {
      case 'delete':
        update = { $set: { deleted: true }};
        break;

      case 'undelete':
        update = { $set: { deleted: false }};
        break;
    }

    await CardModel.updateMany(
      deleteFilter,
      update,
    );

    res.json({ message: `${action} success` });
  } catch (e) {
    console.error(e);
  }
}
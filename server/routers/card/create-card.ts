import {
  Response,
} from 'express';
import Joi from 'joi';
import {
  CardModel,
} from '../../models/card';

export default async function (req: any, res: Response) {
  try {
    const schema: Joi.ObjectSchema = Joi.object({
      description: Joi.string().max(120).required(),
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

    const newCard: any = {
      imageUrl: req.file?.key,
      description: req.body.description,
    };

    const createdCard = await CardModel.create(newCard);

    res.json({ data: createdCard });
  } catch (e) {
    console.error(e);
  }
}
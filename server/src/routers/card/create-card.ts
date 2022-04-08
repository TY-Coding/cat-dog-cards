import {
  Response,
} from 'express';
import Joi from 'joi';
import {
  CardModel,
} from '../../models/card';

/**
 * @api {post} /api/card Create card
 * @apiName CreateCard
 * @apiGroup Card
 *
 * @apiBody {Image} uploadImage image data which should be sent as formdata
 * @apiBody {String} description description of the image
 *
 * @apiSuccess {Object} data card object that just be created
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
 * @apiError (422) validatedError 
 */

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
      imageName: req.file?.key,
      description: req.body.description,
    };

    const createdCard = await CardModel.create(newCard);

    res.json({ data: createdCard });
  } catch (e) {
    console.error(e);
  }
}
import {
  Response,
} from 'express';
import Joi from 'joi';
import aws from 'aws-sdk';
import {
  CardModel,
} from '../../models/card';

aws.config.update({
  secretAccessKey: process.env.AWS_SK,
  accessKeyId: process.env.AWS_AK,
});

const s3 = new aws.S3();

/**
 * @api {put} /api/card/:cardId Edit one card
 * @apiName EditCard
 * @apiGroup Card
 * 
 * @apiParam {Number} cardId id of card
 *
 * @apiSuccess {Object} cardEdited edited card data
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "cardEdited": {
 *        "imageName": "0782a01f-7cb8-4097-a59a-f2cbb287e374.JPG",
 *        "description": "陪窩彼此 安心休息"
 *      }
 * }
 * 
 * @apiUse validatedError 
 * @apiUse cardNotFoundError 
 */

export default async function (req: any, res: Response) {
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

    const cardSchema: Joi.ObjectSchema = Joi.object({
      uploadImage: Joi.string(),
      description: Joi.string().max(120),
    });

    const validatedCard = cardSchema.validate(req.body, {
      abortEarly: false,
    });
  
    if (validatedCard.error) {
      return res.status(422).json({
        error: validatedCard.error.message,
        detail: validatedCard.error.details,
      });
    }

    const cardId: number = parseInt(req.params.cardId);
    const cardFound: any = await CardModel.findById(cardId);
    if (!cardFound) {
      return res.status(404).json({
        message: 'Card Not Found',
      });
    }

    const newCard: any = {
      imageName: req.file?.key || cardFound.imageName,
      description: req.body.description || cardFound.description,
    };

    const cardEdited: any = await CardModel.findByIdAndUpdate(
      cardId,
      { $set: newCard },
      { new: true },
    );


    if (req.file) {
      const s3Params: any = {
        Bucket: process.env.S3_BUCKET!,
        Key: cardFound.imageName,
      };
      s3.deleteObject(s3Params, function(err, _data) {
        if (err) {
          return res.send({ error: err });
        }
      });

    }

    res.json({ cardEdited });
  } catch (e) {
    console.error(e);
  }
}
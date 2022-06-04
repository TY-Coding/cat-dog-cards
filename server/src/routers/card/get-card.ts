import {
  Request,
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
 * @api {get} /api/card/:cardId Get one card
 * @apiName GetCard
 * @apiGroup Card
 * 
 * @apiParam {Number} cardId id of card
 *
 * @apiSuccess {Object} data card object
 * @apiSuccess {String} data.imageName path of image on s3
 * @apiSuccess {Object[]} data.description description of image
 * @apiSuccessExample {json} Success-Response:
 * {
 *      imageName: "5a7c9181-76ff-49b2-862d-f990c7d50557.jpg",
 *      description: "This is dog"
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

    const cardFound: any = await CardModel.findById(cardId);
    if (!cardFound) {
      return res.status(404).json({
        message: 'Card Not Found',
      });
    }

    const s3Params: any = {
      Bucket: process.env.S3_BUCKET!,
      Key: cardFound.imageName,
    };
    s3.getObject(s3Params, function(err, data) {
      if (err) {
        return res.send({ error: err });
      }

      const b64 = data.Body!.toString('base64');
      const mimeType = 'image/*';

      res.json({
        description: cardFound.description,
        imageSrc: `data:${mimeType};base64,${b64}`,
      });
    });
  } catch (e) {
    console.error(e);
  }
}
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
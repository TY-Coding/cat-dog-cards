import {
  Request,
  Response,
} from 'express';
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
 * @api {get} /api/card Get random card
 * @apiName GetRandomCard
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
    const luckyNum: number = Math.floor(Math.random() * cardCount) + 1;

    const cardFound: any = await CardModel.findById(luckyNum);

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
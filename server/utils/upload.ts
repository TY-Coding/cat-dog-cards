import * as path from 'path';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import {
  v4 as uuidv4,
} from 'uuid';

const allowedImageType: string[] = [
  'image/jpg',
  'image/jpeg',
  'image/png',
];

aws.config.update({
  secretAccessKey: process.env.AWS_SK,
  accessKeyId: process.env.AWS_AK,
});

const s3 = new aws.S3();

const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET!,
  metadata: function (_req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (_req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedImageType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
  }
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024,
  },
}).single('uploadImage');
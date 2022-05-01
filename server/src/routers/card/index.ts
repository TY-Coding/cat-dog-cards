import express from 'express';
import {
  uploadMiddleware,
} from '../../utils/upload';
import createCard from './create-card';
import getCard from './get-card';

const router = express.Router();

router.route('/card')
  .get(getCard)
  .post(uploadMiddleware, createCard);

export { router as CardRouter };
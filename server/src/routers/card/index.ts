import express from 'express';
import {
  uploadMiddleware,
} from '../../utils/upload';
import createCard from './create-card';
import getCard from './get-card';
import getRandomCard from './get-random-card';
import listCard from './list-card';

const router = express.Router();

router.get('/cards', listCard);

router.get('/card/:cardId', getCard);

router.route('/card')
  .get(getRandomCard)
  .post(uploadMiddleware, createCard)
  .put()
  .delete()

export { router as CardRouter };
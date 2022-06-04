import express from 'express';
import {
  uploadMiddleware,
} from '../../utils/upload';
import cancelDeleteCard from './cancel-delete-card';
import createCard from './create-card';
import deleteCard from './delete-card';
import deleteManyCard from './delete-many-card';
import editCard from './edit-card';
import getCard from './get-card';
import getRandomCard from './get-random-card';
import listCard from './list-card';

const router = express.Router();

router.route('/cards')
  .get(listCard)
  .post(deleteManyCard)

router.route('/card/:cardId')
  .get(getCard)
  .put(uploadMiddleware, editCard)
  .patch(cancelDeleteCard)
  .delete(deleteCard)

router.route('/card')
  .get(getRandomCard)
  .post(uploadMiddleware, createCard)

export { router as CardRouter };
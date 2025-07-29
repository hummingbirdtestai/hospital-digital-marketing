import express from 'express';
import {
  createExecutive,
  getExecutiveById,
  updateExecutive,
  deleteExecutive,
  listExecutives,
} from '../controllers/executives.controller.js';

const router = express.Router();

router.post('/', createExecutive);
router.get('/', listExecutives);
router.get('/:id', getExecutiveById);
router.patch('/:id', updateExecutive);
router.delete('/:id', deleteExecutive);

export default router;

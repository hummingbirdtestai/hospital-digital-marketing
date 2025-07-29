import express from 'express';
import multer from 'multer';
import {
  getTasksToday,
  getTasksByDate,
  updateTask,
  uploadProof,
  getPerformanceSummary
} from '../controllers/tasks.controller.js';

const router = express.Router();
const upload = multer(); // Handles multipart/form-data

router.get('/today/:executiveId', getTasksToday);
router.get('/date/:date/:executiveId', getTasksByDate);
router.patch('/update/:taskId', updateTask);
router.post('/upload/:taskId', upload.single('file'), uploadProof);
router.get('/executives/:id/performance-summary', getPerformanceSummary);

export default router;

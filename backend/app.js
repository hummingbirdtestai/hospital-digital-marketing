import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes); // All task-related routes

export default app;

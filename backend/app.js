import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.routes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

const app = express();
const swaggerDoc = YAML.load('./swagger.yaml');

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes); // All task-related routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default app;

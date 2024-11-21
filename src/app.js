import express from 'express';
import todosRouter from './routes/todos.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/todos', todosRouter);


export default app;

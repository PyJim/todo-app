import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const todosFilePath = path.join(__dirname, '../data/todos.json');

// Helper functions
const readTodos = () => JSON.parse(fs.readFileSync(todosFilePath, 'utf8'));
const writeTodos = (data) => fs.writeFileSync(todosFilePath, JSON.stringify(data, null, 2));

// Get all todos
router.get('/', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// Get a single todo by ID
router.get('/:id', (req, res) => {
  const todos = readTodos();
  const todo = todos.find((t) => t.id === parseInt(req.params.id, 10));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// Create a new todo
router.post('/', (req, res) => {
  const todos = readTodos();
  const newTodo = { id: Date.now(), ...req.body };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// Update a todo
router.put('/:id', (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  todos[index] = { ...todos[index], ...req.body };
  writeTodos(todos);
  res.json(todos[index]);
});

// Delete a todo
router.delete('/:id', (req, res) => {
  const todos = readTodos();
  const updatedTodos = todos.filter((t) => t.id !== parseInt(req.params.id, 10));
  if (updatedTodos.length === todos.length) return res.status(404).json({ error: 'Todo not found' });

  writeTodos(updatedTodos);
  res.status(204).send();
});

export default router;

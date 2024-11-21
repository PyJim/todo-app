import request from 'supertest';
import app from '../src/app.js';
import http from 'http';

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen(0); // Use an available port
});

afterAll((done) => {
  server.close(done);
});

describe('Todos API', () => {
  it('should fetch all todos', async () => {
    const res = await request(server).get('/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new todo', async () => {
    const newTodo = { title: 'Test Todo', completed: false };
    const res = await request(server).post('/todos').send(newTodo);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newTodo.title);
  });
});

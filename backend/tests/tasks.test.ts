// Integration tests for task CRUD endpoints, scoped to a logged-in user.
import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma';

describe('Tasks API', () => {
  const username = 'testuser_tasks';
  const password = 'password123';
  let token: string;

  beforeAll(async () => {
    await prisma.task.deleteMany({});
    await prisma.user.deleteMany({ where: { username } });

    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ username, password });

    token = registerRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('rejects unauthenticated access', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(401);
  });

  it('creates, lists, updates, and deletes a task', async () => {
    // Create
    const createRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'My Task', description: 'Test task', status: 'pending' });

    expect(createRes.status).toBe(201);
    const taskId = createRes.body.id;

    // List
    const listRes = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.some((t: any) => t.id === taskId)).toBe(true);

    // Update
    const updateRes = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.status).toBe('completed');

    // Delete
    const deleteRes = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteRes.status).toBe(204);
  });
});






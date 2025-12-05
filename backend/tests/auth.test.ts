// Integration tests for auth endpoints: register and login flows.
import request from 'supertest';
import app from '../src/app';
import prisma from '../src/prisma';

describe('Auth API', () => {
  const username = 'testuser_auth';
  const password = 'password123';

  beforeAll(async () => {
    // Ensure database is reachable and clean user if exists
    await prisma.task.deleteMany({});
    await prisma.user.deleteMany({ where: { username } });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username, password });

    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.username).toBe(username);
    expect(res.body.token).toBeDefined();
  });

  it('rejects duplicate registration', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username, password });

    expect(res.status).toBe(409);
    expect(res.body.error).toBeDefined();
  });

  it('logs in an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username, password });

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.token).toBeDefined();
  });

  it('rejects login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username, password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });
});






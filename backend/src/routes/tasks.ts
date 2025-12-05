// Task routes: CRUD operations for tasks scoped to the authenticated user.
import { Router } from 'express';
import prisma from '../prisma';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth';
import { taskCreateSchema, taskUpdateSchema } from '../validation/tasks';

const router = Router();

router.get('/', authenticateJWT, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user!.id;
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticateJWT, async (req: AuthenticatedRequest, res, next) => {
  try {
    const parsed = taskCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
    }
    const userId = req.user!.id;
    const { title, description, status } = parsed.data;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status ?? 'pending',
        userId,
      },
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticateJWT, async (req: AuthenticatedRequest, res, next) => {
  try {
    const parsed = taskUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
    }
    const userId = req.user!.id;
    const id = Number(req.params.id);

    const existing = await prisma.task.findFirst({ where: { id, userId } });
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = await prisma.task.update({
      where: { id },
      data: parsed.data,
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticateJWT, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user!.id;
    const id = Number(req.params.id);

    const existing = await prisma.task.findFirst({ where: { id, userId } });
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;






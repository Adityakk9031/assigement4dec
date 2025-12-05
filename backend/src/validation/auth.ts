// Zod schemas for auth-related request validation.
import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AuthInput = z.infer<typeof authSchema>;






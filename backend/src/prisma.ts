// Prisma client singleton used across the backend for database access.
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables before creating Prisma Client
dotenv.config();

// Verify DATABASE_URL is available
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in environment variables. Please check your .env file.');
}

// Create PostgreSQL connection pool
const pool = new Pool({ connectionString: databaseUrl });

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Prisma Client v7 requires an adapter for direct database connections
const prisma = new PrismaClient({ adapter });

export default prisma;

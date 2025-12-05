# Fix: Supabase Database Connection for Prisma Migrations

## The Problem

Your current connection string uses a **connection pooler** (PgBouncer):
```
postgresql://...@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Prisma migrations don't work with connection poolers.** You need a **direct connection** for migrations.

## Solution: Get the Direct Connection String

### Step 1: Go to Supabase Dashboard

1. Open your Supabase project: https://supabase.com/dashboard
2. Go to **Project Settings** (gear icon in left sidebar)
3. Click **Database** in the settings menu

### Step 2: Find the Direct Connection String

In the Database settings, you'll see **Connection String** section with two options:

1. **Connection Pooling** (port 6543) - ❌ Don't use this for migrations
2. **Direct Connection** (port 5432) - ✅ Use this for migrations

### Step 3: Copy the Direct Connection String

Look for the connection string that:
- Uses port **5432** (not 6543)
- Does NOT have `pooler` in the hostname
- Does NOT have `pgbouncer=true` in the URL

It should look like:
```
postgresql://postgres.rttburxkinnzcebcmhhp:YOUR_PASSWORD@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
```

**OR** if Supabase shows a different hostname for direct connection:
```
postgresql://postgres.rttburxkinnzcebcmhhp:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
```

### Step 4: Update Your .env File

Edit `backend/.env` and replace `DATABASE_URL` with the **direct connection** string:

```env
# Use DIRECT connection (port 5432) for Prisma migrations
DATABASE_URL=postgresql://postgres.rttburxkinnzcebcmhhp:Vdh0KUYKHXbsNnd0@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres

# OR if Supabase gives you a different direct hostname:
# DATABASE_URL=postgresql://postgres.rttburxkinnzcebcmhhp:Vdh0KUYKHXbsNnd0@db.xxxxx.supabase.co:5432/postgres

JWT_SECRET=helloAditya
PORT=4000
```

**Important:** 
- Remove `?pgbouncer=true` from the URL
- Make sure it uses port **5432** (not 6543)
- The hostname might be different (check Supabase dashboard)

### Step 5: Run the Migration

After updating `.env` with the direct connection:

```bash
cd backend
npx prisma migrate dev --name init
```

This should now work! ✅

## Alternative: Use Direct Connection for Everything

If you want to keep it simple, you can use the direct connection for both migrations AND your app. The direct connection works fine for regular queries too, it's just that the pooler is optimized for many concurrent connections.

## Troubleshooting

**Error: "Can't reach database server"**
- Check that your IP is allowed in Supabase → Settings → Database → Connection Pooling → Allowed IPs
- Or temporarily allow all IPs (0.0.0.0/0) for testing

**Error: "Password authentication failed"**
- Double-check your password in the connection string
- Make sure there are no extra spaces or special characters

**Still not working?**
- Try using the "Session mode" connection string if Supabase offers it
- Or use the "Transaction mode" connection string


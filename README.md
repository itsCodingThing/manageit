# ManageIt

A full-stack monorepo application built with Next.js, Bun, and Elysia.

## Project Structure

```
manageit/
├── apps/
│   ├── web/      # Next.js frontend
│   └── api/      # Elysia API server
└── package.json  # Turborepo workspace
```

## Prerequisites

- [Bun](https://bun.sh) (v1.3.9+)
- [PostgreSQL](https://www.postgresql.org/) database

## Setup

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Configure environment variables:**

   Create `.env` files in both apps:

   - `apps/api/.env`:
     ```env
     DATABASE_URL=postgresql://user:password@localhost:5432/manageit
     BETTER_AUTH_SECRET=your-secret-key
     BETTER_AUTH_URL=http://localhost:3000
     ```

   - `apps/web/.env.local`:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```

3. **Set up the database:**
   ```bash
   cd apps/api
   bun run db:push
   ```

4. **Generate auth schema (if needed):**
   ```bash
   cd apps/api
   bun run auth:gen
   ```

## Development

Run both apps concurrently with Turborepo:
```bash
bun run dev
```

Or run individually:
```bash
# API server (port 3001)
cd apps/api && bun run dev

# Web app (port 3000)
cd apps/web && bun run dev
```

## Available Scripts

### API (`apps/api`)
- `bun run dev` - Start development server
- `bun run lint` - Lint code with Biome
- `bun run fmt` - Format code with Biome
- `bun run db:push` - Push schema to database
- `bun run db:studio` - Open Drizzle Studio
- `bun run test` - Run tests

### Web (`apps/web`)
- `bun run dev` - Start Next.js development server

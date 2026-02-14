# Agent Guidelines for ManageIt

This document provides guidelines for agents working on the ManageIt codebase.

## Project Overview

ManageIt is a full-stack monorepo application built with:
- **API**: Elysia (Bun), Drizzle ORM, PostgreSQL, Better Auth
- **Web**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Package Manager**: Bun 1.3.9+
- **Build Tool**: Turborepo

## Project Structure

```
manageit/
├── apps/
│   ├── api/           # Elysia API server
│   │   ├── app/       # Route handlers (auth, student, teacher, admin, school)
│   │   ├── services/  # Business logic (auth.ts)
│   │   ├── database/  # Drizzle schema and db connection
│   │   ├── utils/     # Utilities (response, validation, error, logger)
│   │   ├── middleware/
│   │   ├── tests/     # Test files (*.test.ts)
│   │   └── package.json
│   └── web/           # Next.js frontend
│       ├── app/       # Next.js App Router pages
│       └── package.json
├── package.json       # Turborepo workspace root
└── turbo.json
```

## Build/Lint/Test Commands

### Root (Turborepo)
```bash
bun run dev          # Run all apps concurrently
```

### API App (`apps/api`)
```bash
bun run dev          # Start dev server (port 3001)
bun run lint         # Lint with Biome
bun run fmt          # Format with Biome (writes in place)
bun run test         # Run all tests (bun:test)
bun run test <file>  # Run single test file
bun run typecheck    # Type check with tsgo
bun run db:push      # Push Drizzle schema to DB
bun run db:studio    # Open Drizzle Studio
bun run build:api    # Build for production
```

### Web App (`apps/web`)
```bash
bun run dev          # Start Next.js dev server (port 3000, turbo)
bun run build        # Build for production
bun run start        # Start production server
```

### Running Single Tests
```bash
# In apps/api directory
bun test tests/auth.test.ts
bun test --preload ./backend/tests/setup.ts tests/auth.test.ts  # with preload
```

## Code Style Guidelines

### Formatting & Linting (Biome)
- **Indentation**: Tabs (not spaces)
- **Quotes**: Double quotes for strings
- **Config**: `biome.json` in each app
- Run `bun run lint` before committing
- Run `bun run fmt` to auto-fix formatting

### TypeScript
- **Strict mode**: Enabled in `tsconfig.json`
- **Path aliases**: Use `@/*` for relative imports (e.g., `@/services/auth`)
- **No `any`**: Avoid `any`; use `unknown` or proper typing

### Imports
- Group imports logically: external → internal → relative
- Use path aliases (`@/...`) for internal imports
- Use named exports for clarity

### Naming Conventions
- **Files**: kebab-case (`auth-service.ts`) or PascalCase for components/routes
- **Variables/functions**: camelCase
- **Types/interfaces**: PascalCase with `Type` suffix for types (e.g., `AuthApiType`)
- **Constants**: SCREAMING_SNAKE_CASE for config values

### API Routes (Elysia)
- Use Elysia's decorator pattern
- Define request body schemas with Zod using `@/utils/validation`
- Return responses using `createJsonResponse` utility
- Use prefixes for route grouping (e.g., `prefix: "/api/auth"`)

### Error Handling
- Use Zod for request validation with descriptive error messages
- Use `@/utils/error` for custom error classes
- Return proper HTTP status codes (200, 201, 400, 401, 422, 500)

### Database (Drizzle)
- Schema files in `@/database/schema`
- Use `drizzle-orm` for queries
- Run `bun run db:push` after schema changes

### Authentication
- Uses Better Auth with Drizzle adapter
- Auth service in `@/services/auth.ts`
- Use `betterAuthApi` for auth operations

### Testing
- Test framework: Bun's built-in `bun:test`
- Test files: `apps/api/tests/*.test.ts`
- Use `describe`, `test`, `expect` from "bun:test"
- Test setup in `apps/api/tests/setup.ts` (preload)

### Environment Variables
- Create `.env` files in respective app directories
- Never commit secrets; use `.env.example` for templates

## Common Patterns

### Creating a New API Route
```typescript
import { Elysia } from "elysia";
import { zod } from "@/utils/validation";
import { createJsonResponse } from "@/utils/response";

const newRoute = new Elysia({ prefix: "/api/resource" })
  .post("/endpoint", async ({ body }) => {
    // business logic
    return createJsonResponse({ data: { result: "ok" } });
  }, {
    body: zod.object({
      field: zod.string("required"),
    }),
  });

export default newRoute;
```

### Adding a Database Query
```typescript
import { db } from "@/database/db";
import { tableName } from "@/database/schema";

const result = await db.select().from(tableName).where(...);
```

## Important Notes

- **No Cursor/Copilot rules** currently exist in this repo
- All code must pass Biome linting before committing
- Use `bun` as the package manager (not npm/yarn/pnpm)
- Frontend uses Tailwind CSS 4 with `@tailwindcss/postcss`

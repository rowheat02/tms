import { Config } from 'drizzle-kit';

export default {
  schema: './src/db/drizzle/schema',
  out: './src/db/drizzle/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './db.sqlite',
  },
} satisfies Config;

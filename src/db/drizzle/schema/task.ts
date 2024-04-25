import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const task = sqliteTable('task', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('name', { length: 255 }),
  description: text('description', { length: 500 }),
  priority: integer('priority', { mode: 'number' }),
  status: text('status', { enum: ['pending', 'in progress', 'completed'] }),
  createdAt: integer('createdAt').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updatedAt').default(sql`(CURRENT_TIMESTAMP)`),
});

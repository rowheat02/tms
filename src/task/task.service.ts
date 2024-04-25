import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../db/drizzle/schema';
import { and, eq, like } from 'drizzle-orm';

@Injectable()
export class TaskService {
  constructor(
    @Inject('DB_TASKS')
    private db: BetterSQLite3Database<typeof schema>,
  ) {}

  async getTasks(query) {
    const queries = this.db
      .select()
      .from(schema?.task)
      .where(
        and(
          query.title
            ? like(schema?.task.title, `%${query.title}%`)
            : undefined,
          query.description
            ? like(schema?.task.description, `%${query.description}%`)
            : undefined,
          query.priority
            ? eq(schema?.task.priority, +query.priority)
            : undefined,
          query.status ? eq(schema?.task.status, query.status) : undefined,
        ),
      );

    const Tasks = queries.execute();
    return Tasks;
  }

  async createTask(CreateTaskDto) {
    const task = await this.db
      .insert(schema?.task)
      .values(CreateTaskDto)
      .returning()
      .get();
    return task;
  }

  async updateTask(id: number, data) {
    const task = await this.db.query.task.findFirst({
      where: eq(schema?.task.id, id),
    });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    const updatedTask = await this.db
      .update(schema?.task)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema?.task.id, id))
      .returning()
      .get();
    return updatedTask;
  }

  async deleteTask(id: number) {
    const task = await this.db.query.task.findFirst({
      where: eq(schema?.task.id, id),
    });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    await this.db.delete(schema?.task).where(eq(schema?.task.id, id)).execute();
    return { message: 'Task deleted' };
  }
}

import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import * as schema from '../db/drizzle/schema/';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    DrizzleBetterSQLiteModule.register({
      tag: 'DB_TASKS',
      sqlite3: {
        filename: 'db.sqlite',
      },
      config: { schema: { ...schema } },
    }),
  ],
})
export class TaskModule {}

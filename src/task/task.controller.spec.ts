import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { NotFoundException } from '@nestjs/common';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import * as schema from '../db/drizzle/schema/';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createTask', async () => {
    const createTaskSpy = jest.spyOn(service, 'createTask');
    await controller.createTask({
      title: 'test',
      description: 'test',
      priority: 1,
      status: 'test',
    });
    expect(createTaskSpy).toHaveBeenCalled();
  });

  it('should return list of tasks', async () => {
    const task = [
      {
        id: 1,
        title: 'test',
        description: 'test',
        priority: 1,
        status: 'pending' as 'pending' | 'in progress' | 'completed',
        createdAt: 1631533200000,
        updatedAt: 1631533200000,
      },
    ];
    jest.spyOn(service, 'getTasks').mockResolvedValue(task);
    expect(
      await controller.getTasks({
        priority: 1,
        status: 'pending',
      }),
    ).toBe(task);
  });
  it('should throw NotFoundException if task not found while deleting', async () => {
    jest
      .spyOn(service, 'deleteTask')
      .mockRejectedValue(new NotFoundException());
    await expect(controller.deleteTask('1')).rejects.toThrow(NotFoundException);
  });
});

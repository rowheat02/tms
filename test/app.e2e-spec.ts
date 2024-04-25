import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdTaskId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/create a task', () => {
    // create a task and return the response object
    return request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'test',
        description: 'test',
        priority: 1,
        status: 'pending',
      })
      .expect(201)
      .then((response) => {
        createdTaskId = response.body.id;
      });
  });

  it('/update a task', () => {
    return request(app.getHttpServer())
      .patch(`/tasks/${createdTaskId}`)
      .send({
        title: 'updated title',
        description: 'updated desc',
        priority: 1,
        status: 'in progress',
      })
      .expect(200);
  });

  // delete the task
  it('/delete a task', () => {
    return request(app.getHttpServer())
      .delete(`/tasks/${createdTaskId}`)
      .expect(200);
  });
});

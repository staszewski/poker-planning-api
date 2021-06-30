import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { Connection, Repository, Table } from 'typeorm';
import { UserEntity } from '../src/user/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useWebSocketAdapter(new WsAdapter());
    await app.init();

    const connection = app.get(Connection);

    repository = connection.manager.getRepository(UserEntity);
    await connection.dropDatabase();
    await connection.runMigrations();
    await connection.synchronize();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/user/register (POST)', () => {
    repository.create();
    return request(app.getHttpServer())
      .post('/user/register')
      .send({ email: 'bombolo@gmail.com', password: 'test123' })
      .expect(201);
  });
});

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BoardsModule } from '../src/models/boards/boards.module';
import { BoardsService } from '../src/models/boards/boards.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { BoardsController } from '../src/models/boards/boards.controller';
describe('Boards', () => {
  let app: INestApplication;
  let boardsService = { getBoards: (): Promise<[]> => Promise.resolve([]) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      // imports: [BoardsModule],
      controllers: [BoardsController],
      providers: [BoardsService],
    })
      .overrideProvider(BoardsService)
      .useValue(boardsService)
      .compile();

      app = moduleRef.createNestApplication<NestFastifyApplication>(
        new FastifyAdapter(),
      );
      
      await app.init();
      await app.getHttpAdapter().getInstance().ready();
  });

  it(`/GET boards`, () => {
    return request(app.getHttpServer())
      .get('/boards')
      .expect(200)
      .expect({
        data: boardsService.getBoards(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

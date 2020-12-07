import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Silas Man', true);
  const globalPrefix = '/api';

  app.enableCors();
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.setGlobalPrefix(globalPrefix);

  if (AppModule.isDev) {
    const options = new DocumentBuilder()
      .setTitle('Rest API CRUD postgres vs mongodb')
      .setVersion('1.1')
      .setBasePath('api')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'authorization',
      )
      .setContact('mr.Mẫn', 'https://graphql-api-v1.herokuapp.com/', 'hoangman772@gmail.com')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  }
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(AppModule.port);

  let baseUrl = app.getHttpServer().address().address;
  if (baseUrl === '0.0.0.0' || baseUrl === '::') {
    baseUrl = 'localhost';
  }
  logger.log(`Listening to http://${baseUrl}:${AppModule.port}${globalPrefix}`);
  if (AppModule.isDev) {
    logger.log(
      `Swagger UI: http://${baseUrl}:${AppModule.port}${globalPrefix}/docs`,
    );
  }
}
bootstrap();
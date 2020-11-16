// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Rest API CRUD postgres vs mongodb')
    // .setDescription('Simple api with beginner')
    .setVersion('1.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'authorization',
    )
    .setContact('mr.Mẫn', 'https://graphql-api-v1.herokuapp.com/', 'hoangman772@gmail.com')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(process.env.PORT || 4000);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
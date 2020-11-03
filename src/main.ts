// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Rest API CRUD')
    .setDescription('Simple api with beginner')
    .setVersion('1.0')
    // .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
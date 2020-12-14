import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import LoggerMiddleware from 'src/common/middleware/logger.middleware';
import { AuthModule } from '../../authentication/auth.module';
import { BloomController } from './bloom.controller';
import { Bloom, BloomSchema } from './bloom.schema';
import { BloomService } from './bloom.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bloom.name, schema: BloomSchema }]),
    AuthModule,
  ],
  controllers: [BloomController],
  providers: [BloomService]
})
export class BloomModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) //multiple
      .forRoutes(
        { path: 'bloomBoxes', method: RequestMethod.GET },
        { path: 'boards', method: RequestMethod.ALL }
      )
  }
 }

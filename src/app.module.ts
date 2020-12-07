import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksModule } from './models/tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './authentication/auth.module';
import { ProfilesModule } from './models/profiles/profiles.module';
import { BoardsModule } from './models/boards/boards.module';
import { BloomModule } from './models/bloom/bloom.module';
import dataConfig from './config/database';
import { BloomBoxModule } from './models/bloom-boxes/bloomBox.module';
import LoggerMiddleware from './common/middleware/logger.middleware';
import { ConfigurationService } from './common/configuration/configuration.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://hoangman:123@cluster0.ascy6.mongodb.net/Nest?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true'),
    ConfigModule.forRoot({
      load: [dataConfig]
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TasksModule,
    ProfilesModule,
    BoardsModule,
    BloomModule,
    BloomBoxModule,
  ],
})
export class AppModule implements NestModule {

  static _configurationService: ConfigurationService = new ConfigurationService();

  static port: number | string = AppModule.normalizePort(AppModule._configurationService.port);
  static isDev: boolean = AppModule._configurationService.isDevelopment;

  private static normalizePort(val: number | string): number | string {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val;

    if (Number.isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    throw new Error(`Port "${val}" is invalid.`);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) //multiple
      .forRoutes(
        { path: 'bloomBoxes', method: RequestMethod.GET },
        { path: 'boards', method: RequestMethod.ALL }
      )
  }
}
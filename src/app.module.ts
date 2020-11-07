import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './models/tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './authentication/auth.module';
import { ProfilesModule } from './models/profiles/profiles.module';
import { BoardsModule } from './models/boards/boards.module';
import dataConfig from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dataConfig]
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TasksModule,
    ProfilesModule,
    BoardsModule,
  ],
})
export class AppModule { }

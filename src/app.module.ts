import { Module } from '@nestjs/common';
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
export class AppModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './models/tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './authentication/auth.module';
import { ProfilesModule } from './models/profiles/profiles.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TasksModule,
    ProfilesModule,
  ],
})
export class AppModule { }

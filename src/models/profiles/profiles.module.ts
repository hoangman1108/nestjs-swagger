import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileRepository]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService]
})
export class ProfilesModule {}

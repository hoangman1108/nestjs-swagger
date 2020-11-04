import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfilesService {

  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository
  ){}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile>{
    return this.profileRepository.createProfile(createProfileDto);
  }

  async getProfiles():Promise<Profile[]>{
    return this.profileRepository.getProfiles();
  }
}

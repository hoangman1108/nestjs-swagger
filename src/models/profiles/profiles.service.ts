import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/authentication/entities/auth.entity';
import { Profile } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfilesService {

  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository
  ){}

  async getProfiles():Promise<Profile[]>{
    return this.profileRepository.getProfiles();
  }

  async getProfilesById(user: User):Promise<any>{
    const profile = await this.profileRepository.findOne({
      where: {
        id: user.profileId,
      }
    });

    return {
      ...profile,
      username: user.username,
    }
  }
}

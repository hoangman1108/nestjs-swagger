import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@ApiTags('Profile')
@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService){ }

  @Get()
  async getProfiles(): Promise<Profile[]>{
    return this.profileService.getProfiles();
  }
  
  @Post()
  async createProfile(
    @Body() createProfileDto: CreateProfileDto
  ): Promise<Profile>{
    return this.profileService.createProfile(createProfileDto);
  }
}

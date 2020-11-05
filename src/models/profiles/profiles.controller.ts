import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from 'src/authentication/entities/auth.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@ApiTags('Profile')
@Controller('profiles')
@ApiSecurity('authorization')
@UseGuards(AuthGuard())
export class ProfilesController {
  constructor(private profileService: ProfilesService){ }

  @Get()
  async getProfiles(): Promise<Profile[]>{
    return this.profileService.getProfiles();
  }

  @Get('/info')
  async getInfoProfile(
    @GetUser() user: User
  ):Promise<any>{
    return await this.profileService.getProfilesById(user);
  }
}

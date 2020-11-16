import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from 'src/authentication/entities/auth.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { GetProfile } from 'src/common/decorators/get-profile.decorator';
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
    @GetUser() user: User,
    @GetProfile() profile: Profile,
  ):Promise<any>{
    return {
      ...profile,
      username: user.username,
    }
  }
}

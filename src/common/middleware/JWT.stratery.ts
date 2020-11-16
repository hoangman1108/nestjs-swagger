import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ProfileRepository } from 'src/models/profiles/profile.repository';
import { JwtPayload } from '../../authentication/interfaces/jwt-payload.interface';
import { UserRepository } from '../../authentication/user.repository';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'thisIsSecretKey',
    })
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });
    const profile = await this.profileRepository.findOne({ id: user.profileId });

    if (!user) {
      throw new UnauthorizedException();
    }
    return { user, profile };
  }
}
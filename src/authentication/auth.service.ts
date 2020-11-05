import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialsDto);
  }

  async signin(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(loginCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken }
  }
}

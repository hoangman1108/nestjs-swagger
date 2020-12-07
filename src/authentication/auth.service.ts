import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/auth.entity';
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

  async signin(loginCredentialsDto: LoginCredentialsDto): Promise<{ data: User, accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(loginCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { username };
    const data: User = await this.userRepository.findOne({ username });
    const accessToken = this.jwtService.sign(payload);
    return { data, accessToken }
  }
}

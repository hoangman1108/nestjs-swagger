import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, LoginCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/auth.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) { };

  @Post('/signup')
  signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signup(authCredentialsDto);
  }

  @Post('/signin')
  signin(@Body() loginCredentialsDto: LoginCredentialsDto): Promise<{ data: User, accessToken: string }> {
    return this.authService.signin(loginCredentialsDto);
  }

  // @Post('/test')
  // @ApiSecurity('authorization')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}

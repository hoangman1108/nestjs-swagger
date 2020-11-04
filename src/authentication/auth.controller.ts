import { Body, Controller, Post , ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) { };

  @Post('/signup')
  signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signup(authCredentialsDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signin(authCredentialsDto);
  }

  // @Post('/test')
  // @ApiSecurity('authorization')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}

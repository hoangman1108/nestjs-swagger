import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../common/middleware/JWT.stratery';
import { UserRepository } from './user.repository';
import { ProfilesModule } from 'src/models/profiles/profiles.module';
import { ProfileRepository } from 'src/models/profiles/profile.repository';

@Module({
  imports:[
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'thisIsSecretKey',
      signOptions:{
        expiresIn: '1h',
      }
    }),
    TypeOrmModule.forFeature([
      UserRepository,
      ProfileRepository,
    ]),
    ProfilesModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports:[
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}

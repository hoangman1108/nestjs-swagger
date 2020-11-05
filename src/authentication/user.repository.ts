import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { AuthCredentialsDto, LoginCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./entities/auth.entity";
import { Profile } from "src/models/profiles/entities/profile.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, name, phone, locale } = authCredentialsDto;
    const profile = new Profile();
    profile.name = name;
    profile.phone = phone;
    profile.locale = locale;

    try {
      await profile.save()
    } catch (error) {
      if (error.code === '23505') { //duplicate username
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.profile = profile;

    try {
      await user.save();
      delete user.profile;
    } catch (error) {
      if (error.code === '23505') { //duplicate username
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }

  }

  async validateUserPassword(loginCredentialsDto: LoginCredentialsDto): Promise<string> {
    const { username, password } = loginCredentialsDto;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    }
    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
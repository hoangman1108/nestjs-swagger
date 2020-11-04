import { EntityRepository, Repository } from "typeorm";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { Profile } from "./entities/profile.entity";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile>{
  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { name, phone, locale } = createProfileDto;
    const profile = new Profile();
    profile.name = name;
    profile.phone = phone;
    profile.locale = locale;
    await profile.save();
    return profile;
  }

  async getProfiles(): Promise<Profile[]> {
    const query = this.createQueryBuilder('profile');
    // query.where('profile.userId = :userId',{ userId: user.id });
    const profiles = await query.getMany();
    return profiles;
  }
}
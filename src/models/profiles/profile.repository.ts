import { EntityRepository, Repository } from "typeorm";
import { Profile } from "./entities/profile.entity";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile>{
  async getProfiles(): Promise<Profile[]> {
    const query = this.createQueryBuilder('profile');
    // query.where('profile.userId = :userId',{ userId: user.id });
    const profiles = await query.getMany();
    return profiles;
  }
}
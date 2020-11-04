import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "../../models/tasks/entities/task.entity";
import { Profile } from "src/models/profiles/entities/profile.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Task, task => task.user, { eager: true })
  tasks: Task[]

  @OneToOne(() => Profile, profile => profile.id) // specify inverse side as a second parameter
  @JoinColumn()
  profile: Profile;

  @Column()
  profileId: number;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

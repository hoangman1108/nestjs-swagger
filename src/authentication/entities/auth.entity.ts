import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "../../models/tasks/entities/task.entity";
import { Profile } from "../../models/profiles/entities/profile.entity";
import { Board } from "../../models/boards/entities/board.entity";

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

  @OneToMany(() => Board, board => board.user, { eager: true })
  boards: Board[]

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

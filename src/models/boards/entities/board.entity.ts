import { User } from "../../../authentication/entities/auth.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, user => user.boards, { eager: false })
  user: User;

  @Column()
  userId: number;
}
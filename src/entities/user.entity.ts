import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import Post from "./post.entity";

@Entity('user')
export default class User {

  @PrimaryColumn()
  id: string;

  @Column({
    name: 'pw',
    select: false,
  })
  pw: string;

  @Column()
  name: string;

  @Column()
  field: string;

  @Column({
    name: 'user_key',
    select: false,
    nullable: true,
  })
  userKey?: string;

  @Column({
    name: 'profile_image',
    type: 'varchar',
    nullable: true,
  })
  profileImage: string | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @OneToMany(type => Post, post => post.user)
  post: Post[];
}
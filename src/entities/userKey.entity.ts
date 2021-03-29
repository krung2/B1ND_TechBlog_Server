import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import User from "./user.entity";

@Entity('user_key')
export default class UserKey {

  @PrimaryColumn({
    name: 'key_id',
    type: 'varchar', 
  })
  keyId!: string;

  @Column()
  permission!: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @OneToMany(type => User, user => user.userKey)
  user: User[]
}
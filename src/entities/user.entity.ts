import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  OneToMany, 
  PrimaryColumn, 
  RelationId 
} from "typeorm";
import Post from "./post.entity";
import UserKey from "./userKey.entity";

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

  @RelationId((userKey: UserKey) => userKey.keyId)
  userKeyId: string

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

  @JoinColumn({ name: 'fk_user_key_id' })
  @ManyToOne(type => UserKey, {
    onDelete: 'CASCADE',
  })
  userKey!: UserKey;

  @OneToMany(type => Post, post => post.user)
  post: Post[];
}
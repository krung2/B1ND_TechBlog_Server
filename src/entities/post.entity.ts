import { type } from "node:os";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn, 
  RelationId 
} from "typeorm";
import User from "./user.entity";

@Entity('post')
export default class Post {
  
  @PrimaryColumn()
  idx!: number;

  @RelationId((post: Post) => post.user)
  userId: string | null

  @Column()
  title: string;

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @JoinColumn({ name: 'fk_user_id' })
  @ManyToOne(type => User, {
    onDelete: 'SET NULL',
  })
  user!: User | null;

}
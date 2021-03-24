import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {

  @PrimaryColumn()
  id: string;

  @Column({
    name: 'pw',
    select: false,
  })
  pw: string;

  @Column()
  name: string;
  
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string
}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  index: number;

  @Column()
  userName: string;

  @Column()
  password: string;
}

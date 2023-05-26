import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('increment')
  index: number;

  @Column({ length: 100 })
  id: string;

  @Column({ length: 100 })
  pw: string;
}

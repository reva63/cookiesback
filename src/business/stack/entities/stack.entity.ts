import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stack: string;

  @Column()
  level: string;

  @Column({ unique: true })
  email: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pets' })
export class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthDate: string;
}

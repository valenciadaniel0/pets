import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PetEntity } from 'src/infraestructura/pet/entity/pet.entity';

@Entity({ name: 'vaccines' })
export class VaccineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @ManyToOne(
    type => PetEntity,
    pet => pet.vaccines,
  )
  pet: PetEntity;
}

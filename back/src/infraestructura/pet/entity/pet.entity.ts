import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VaccineEntity } from 'src/infraestructura/vaccine/entity/vaccine.entity';

@Entity({ name: 'pets' })
export class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthDate: string;

  @OneToMany(type => VaccineEntity, vaccine => vaccine.pet)
  vaccines: VaccineEntity[];
}

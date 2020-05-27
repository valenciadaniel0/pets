import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Optional } from '@nestjs/common';

@Entity({ name: 'users' })
export class UsuarioEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  @Optional()
  createdAt: Date;
}

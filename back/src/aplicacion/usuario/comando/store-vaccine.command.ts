import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Pet } from 'src/dominio/usuario/modelo/pet';

export class StoreVaccineCommand {
  @IsString()
  @ApiProperty({ example: 'parvovirus' })
  public name: string;

  @IsString()
  @ApiProperty({ example: '2020-05-28' })
  public date: string;

  @IsObject()
  @ApiProperty()
  public pet: Pet;
}

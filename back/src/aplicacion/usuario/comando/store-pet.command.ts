import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Vaccine } from 'src/dominio/usuario/modelo/vaccine';

export class StorePetCommand {
  @IsString()
  @ApiProperty({ example: 'Scooby' })
  public name: string;

  @IsString()
  @ApiProperty({ example: '01-250-2020' })
  public birthDate: string;

  @IsArray()
  @ApiProperty()
  public vaccines: Vaccine[];
}

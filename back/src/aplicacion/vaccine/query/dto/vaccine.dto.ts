import { ApiProperty } from '@nestjs/swagger';

export class VaccineDto {
  @ApiProperty({ example: 'parvovirus' })
  name: string;

  @ApiProperty({ example: '2020-05-28' })
  date: string;
}

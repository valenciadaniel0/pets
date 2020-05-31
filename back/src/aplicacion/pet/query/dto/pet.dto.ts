import { ApiProperty } from "@nestjs/swagger";

export class PetDto{
    @ApiProperty({ example: 'Scooby' })
    name: string;
  
    @ApiProperty({ example: '01-250-2020' })
    birthDate: string;
}
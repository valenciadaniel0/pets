import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarUsuario {
  @IsString()
  @ApiProperty({ example: 'William'})
  public name: string;

  @IsString()
  @ApiProperty({ example: 'valenciadaniel0@gmail.com'})
  public email: string;

  @IsString()
  @ApiProperty({ minLength: 4, example: '1234' })
  public password: string;
}

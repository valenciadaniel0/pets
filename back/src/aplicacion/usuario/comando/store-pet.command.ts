import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class StorePetCommand{
    @IsString()
    @ApiProperty({ example: 'Scooby'})
    public name: string;

    @IsString()
    @ApiProperty({ example: '01-250-2020'})
    public birthDate: string;    
}
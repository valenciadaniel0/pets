import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { StorePetHandler } from 'src/aplicacion/usuario/comando/store-pet.handler';
import { StorePetCommand } from 'src/aplicacion/usuario/comando/store-pet.command';

@Controller('pets')
export class PetController {
  constructor(private readonly _storePetHandler: StorePetHandler) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() storePetCommand: StorePetCommand) {
    await this._storePetHandler.run(storePetCommand);
  }
}

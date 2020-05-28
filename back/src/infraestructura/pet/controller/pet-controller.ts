import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
} from '@nestjs/common';
import { StorePetHandler } from 'src/aplicacion/usuario/comando/store-pet.handler';
import { StorePetCommand } from 'src/aplicacion/usuario/comando/store-pet.command';
import { PetDto } from 'src/aplicacion/usuario/consulta/dto/pet.dto';
import { ListPetsHandler } from 'src/aplicacion/usuario/consulta/list-pets.handler';

@Controller('pets')
export class PetController {
  constructor(
    private readonly _storePetHandler: StorePetHandler,
    private readonly _listPetsHandler: ListPetsHandler,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() storePetCommand: StorePetCommand) {
    await this._storePetHandler.run(storePetCommand);
  }

  @Get()
  async list(): Promise<PetDto[]> {
    return await this._listPetsHandler.run();
  }
}

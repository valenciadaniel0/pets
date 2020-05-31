import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { StorePetHandler } from 'src/aplicacion/pet/command/store-pet.handler';
import { StorePetCommand } from 'src/aplicacion/pet/command/store-pet.command';
import { PetDto } from 'src/aplicacion/pet/query/dto/pet.dto';
import { ListPetsHandler } from 'src/aplicacion/pet/query/list-pets.handler';
import { FindPetHandler } from 'src/aplicacion/pet/query/find-pet.handler';
import { DeletePetHandler } from 'src/aplicacion/pet/command/delete-pet.handler';

@Controller('pets')
export class PetController {
  constructor(
    private readonly _storePetHandler: StorePetHandler,
    private readonly _deletePetHandler: DeletePetHandler,
    private readonly _listPetsHandler: ListPetsHandler,
    private readonly _findPetsHandler: FindPetHandler,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() storePetCommand: StorePetCommand) {
    await this._storePetHandler.run(storePetCommand);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this._deletePetHandler.run(id);
  }

  @Get()
  async list(): Promise<PetDto[]> {
    return await this._listPetsHandler.run();
  }

  @Get(':id')
  async find(@Param() params: any): Promise<PetDto> {
    return this._findPetsHandler.run(params.id);
  }
}

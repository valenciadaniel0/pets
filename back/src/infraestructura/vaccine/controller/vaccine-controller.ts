import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { StoreVaccineHandler } from 'src/aplicacion/vaccine/command/store-vaccine-handler';
import { StoreVaccineCommand } from 'src/aplicacion/vaccine/command/store-vaccine.command';
import { VaccineDto } from 'src/aplicacion/vaccine/query/dto/vaccine.dto';
import { ListVaccinesHandler } from 'src/aplicacion/vaccine/query/list-vaccines.handler';
import { ListVaccinesByPetHandler } from 'src/aplicacion/vaccine/query/list-vaccines-by-pet.handler';
import { DeleteVaccineHandler } from 'src/aplicacion/vaccine/command/delete-vaccine.handler';

@Controller('vaccines')
export class VaccineController {
  constructor(
    private readonly _storeVaccineHandler: StoreVaccineHandler,
    private readonly _listVaccinesHandler: ListVaccinesHandler,
    private readonly _listVaccinesByPetHandler: ListVaccinesByPetHandler,
    private readonly _deleteVaccineHandler: DeleteVaccineHandler,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() storeVaccineCommand: StoreVaccineCommand) {
    await this._storeVaccineHandler.run(storeVaccineCommand);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this._deleteVaccineHandler.run(id);
  }

  @Get()
  async list(@Query('petId') petId): Promise<VaccineDto[]> {
    if (undefined !== petId && petId !== 0) {
      return await this._listVaccinesByPetHandler.run(petId);
    }
    return await this._listVaccinesHandler.run();
  }
}

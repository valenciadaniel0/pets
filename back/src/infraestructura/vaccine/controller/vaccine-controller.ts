import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { StoreVaccineHandler } from 'src/aplicacion/usuario/comando/store-vaccine-handler';
import { StoreVaccineCommand } from 'src/aplicacion/usuario/comando/store-vaccine.command';

@Controller('vaccines')
export class VaccineController {
  constructor(private readonly _storeVaccineHandler: StoreVaccineHandler) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() storeVaccineCommand: StoreVaccineCommand) {    
    await this._storeVaccineHandler.run(storeVaccineCommand);
  }
}

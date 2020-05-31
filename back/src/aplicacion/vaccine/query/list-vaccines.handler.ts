import { Injectable } from "@nestjs/common";
import { VaccineDao } from "src/dominio/vaccine/port/dao/vaccine-dao";
import { VaccineDto } from "./dto/vaccine.dto";

@Injectable()
export class ListVaccinesHandler {
  constructor(private _vaccineDao: VaccineDao) {}

  async run(): Promise<VaccineDto[]> {
    return await this._vaccineDao.findAll();
  }
}
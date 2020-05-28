import { VaccineDto } from "src/aplicacion/usuario/consulta/dto/vaccine.dto";

export abstract class VaccineDao{
    abstract async findAll():Promise<VaccineDto[]>;
}
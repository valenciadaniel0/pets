import { PetDao } from "src/dominio/usuario/puerto/dao/pet-dao";
import { PetMysqlDao } from "../../adapter/dao/pet-mysql-dao";

export const petDaoProvider = {
    provide: PetDao,
    useClass: PetMysqlDao,
  };
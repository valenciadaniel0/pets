import { PetDao } from "src/dominio/pet/port/dao/pet-dao";
import { PetMysqlDao } from "../../adapter/dao/pet-mysql-dao";

export const petDaoProvider = {
    provide: PetDao,
    useClass: PetMysqlDao,
  };
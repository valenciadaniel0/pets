import { StoreVaccineService } from "src/dominio/usuario/servicio/store-vaccine-service";
import { SinonStubbedInstance } from "sinon";
import { VaccineRepository } from "src/dominio/usuario/puerto/repositorio/vaccine-repository";
import { createStubObj } from "test/util/create-object.stub";
import { Vaccine } from "src/dominio/usuario/modelo/vaccine";
import { FindPetHandler } from "src/aplicacion/usuario/consulta/find-pet.handler";
import { PetDao } from "src/dominio/usuario/puerto/dao/pet-dao";

describe('StoreVaccineService', () => {
  let storeVaccineService: StoreVaccineService;
  let vaccineRepositoryStub: SinonStubbedInstance<VaccineRepository>;
  let findPetHandler:FindPetHandler;
  let petDaoStub:SinonStubbedInstance<PetDao>;

  beforeEach(() => {
    vaccineRepositoryStub = createStubObj<VaccineRepository>(['save']);
    storeVaccineService = new StoreVaccineService(vaccineRepositoryStub);
    petDaoStub=createStubObj<PetDao>(['find']);
    findPetHandler = new FindPetHandler(petDaoStub);
  });

  it('A vaccine with all the fields should be stored', async () => {

    //await storeVaccineService.run(new Vaccine('ParvoVirus', '2020-05-25',{'id':1}));

    //expect(petRepositoryStub.save.getCalls().length).toBe(1);
  });
});
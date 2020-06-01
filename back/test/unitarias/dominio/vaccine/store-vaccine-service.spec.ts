import { StoreVaccineService } from 'src/dominio/vaccine/service/store-vaccine-service';
import { SinonStubbedInstance } from 'sinon';
import { VaccineRepository } from 'src/dominio/vaccine/port/repository/vaccine-repository';
import { createStubObj } from 'test/util/create-object.stub';
import { Vaccine } from 'src/dominio/vaccine/model/vaccine';
import { FindPetHandler } from 'src/aplicacion/pet/query/find-pet.handler';
import { PetDao } from 'src/dominio/pet/port/dao/pet-dao';
import { Pet } from 'src/dominio/pet/model/pet';
import { DeleteVaccineService } from 'src/dominio/vaccine/service/delete-vaccine-service';

describe('StoreVaccineService', () => {
  let storeVaccineService: StoreVaccineService;
  let deleteVaccineService: DeleteVaccineService;
  let vaccineRepositoryStub: SinonStubbedInstance<VaccineRepository>;

  beforeEach(() => {
    vaccineRepositoryStub = createStubObj<VaccineRepository>([
      'save',
      'delete',
    ]);
    storeVaccineService = new StoreVaccineService(vaccineRepositoryStub);
    deleteVaccineService = new DeleteVaccineService(vaccineRepositoryStub);
  });

  it('A vaccine with all the fields should be stored', async () => {
    let pet: Pet = new Pet('Toño', '2019-12-01', []);
    await storeVaccineService.run(new Vaccine('ParvoVirus', '2020-05-25', pet));
    expect(vaccineRepositoryStub.save.getCalls().length).toBe(1);
  });

  it('A vaccine with the specified pet id should be deleted', async () => {
    let pet: Pet = new Pet('Toño', '2019-12-01', []);
    await storeVaccineService.run(new Vaccine('ParvoVirus', '2020-05-25', pet));
    await deleteVaccineService.run(1);
    expect(vaccineRepositoryStub.delete.getCalls().length).toBe(1);
  });
});

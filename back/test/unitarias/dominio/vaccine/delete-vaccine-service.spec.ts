import { DeleteVaccineService } from 'src/dominio/vaccine/service/delete-vaccine-service';
import { VaccineRepository } from 'src/dominio/vaccine/port/repository/vaccine-repository';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from 'test/util/create-object.stub';

describe('DeleteVaccineService', () => {
  let deleteVaccineService: DeleteVaccineService;
  let vaccineRepositoryStub: SinonStubbedInstance<VaccineRepository>;

  beforeEach(() => {
    vaccineRepositoryStub = createStubObj<VaccineRepository>(['delete']);
    deleteVaccineService = new DeleteVaccineService(vaccineRepositoryStub);
  });

  it('A vaccine with the specified id should be deleted', async () => {
    await deleteVaccineService.run(1);
    expect(vaccineRepositoryStub.delete.getCalls().length).toBe(1);
  });
});

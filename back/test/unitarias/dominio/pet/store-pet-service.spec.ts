import { StorePetService } from 'src/dominio/pet/service/store-pet-service';
import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from 'test/util/create-object.stub';
import { Pet } from 'src/dominio/pet/model/pet';

describe('StorePetService', () => {
  let storePetService: StorePetService;
  let petRepositoryStub: SinonStubbedInstance<PetRepository>;

  beforeEach(() => {
    petRepositoryStub = createStubObj<PetRepository>(['save']);
    storePetService = new StorePetService(petRepositoryStub);
  });

  it('A pet with all the fields should be stored', async () => {
    await storePetService.run(new Pet('Firulais', '2020-05-25',[]));

    expect(petRepositoryStub.save.getCalls().length).toBe(1);
  });
});

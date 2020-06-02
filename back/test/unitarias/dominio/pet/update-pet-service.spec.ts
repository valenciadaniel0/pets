import { UpdatePetService } from 'src/dominio/pet/service/update-pet-service';
import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { createStubObj } from 'test/util/create-object.stub';
import { SinonStubbedInstance } from 'sinon';
import { FindPetHandler } from 'src/aplicacion/pet/query/find-pet.handler';
import { PetDao } from 'src/dominio/pet/port/dao/pet-dao';
import { Pet } from 'src/dominio/pet/model/pet';

describe('UpdatePetService', () => {
  let updatePetService: UpdatePetService;
  let findPetHanler: FindPetHandler;
  let petRepositoryStub: SinonStubbedInstance<PetRepository>;
  let petDaoStub: SinonStubbedInstance<PetDao>;

  beforeEach(() => {
    petRepositoryStub = createStubObj<PetRepository>(['update']);
    petDaoStub = createStubObj<PetDao>(['find']);
    updatePetService = new UpdatePetService(petRepositoryStub);
    findPetHanler = new FindPetHandler(petDaoStub);
  });

  it('A pet with all the fields should be updated', async () => {
    let pet = new Pet('Test name', '2020-01-25', []);
    await updatePetService.run(1, pet);    
    expect(petRepositoryStub.update.getCalls().length).toBe(1);
  });
});

import { UpdatePetService } from 'src/dominio/pet/service/update-pet-service';
import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';
import { createStubObj } from 'test/util/create-object.stub';
import { SinonStubbedInstance } from 'sinon';
import { Pet } from 'src/dominio/pet/model/pet';

describe('UpdatePetService', () => {
  let updatePetService: UpdatePetService;  
  let petRepositoryStub: SinonStubbedInstance<PetRepository>;  

  beforeEach(() => {
    petRepositoryStub = createStubObj<PetRepository>(['update']);    
    updatePetService = new UpdatePetService(petRepositoryStub);    
  });

  it('A pet with all the fields should be updated', async () => {
    let pet = new Pet('Test name', '2020-01-25', []);
    await updatePetService.run(1, pet);    
    expect(petRepositoryStub.update.getCalls().length).toBe(1);
  });
});

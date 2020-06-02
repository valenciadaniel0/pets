import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from 'test/util/create-object.stub';
import { DeletePetService } from 'src/dominio/pet/service/delete-pet-service';
import { PetRepository } from 'src/dominio/pet/port/repository/pet-repository';

describe('DeletePetService', () => {
  let deletePetService: DeletePetService;
  let petRepositoryStub: SinonStubbedInstance<PetRepository>;  

  beforeEach(() => {
    petRepositoryStub = createStubObj<PetRepository>([      
      'delete'
    ]);   
    deletePetService = new DeletePetService(petRepositoryStub);
  });  

  it('A pet with the specified id should be deleted', async () => {    
    await deletePetService.run(1);
    expect(petRepositoryStub.delete.getCalls().length).toBe(1);
  });
});

import { Module } from '@nestjs/common';
import { PetProviderModule } from './provider/pet-provider-module';
import { PetController } from './controller/pet-controller';

@Module({
  imports: [PetProviderModule],
  controllers: [PetController],
})
export class PetModule {}

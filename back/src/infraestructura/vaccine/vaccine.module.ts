import { Module } from "@nestjs/common";
import { VaccineProviderModule } from "./provider/vaccine-provider-module";
import { VaccineController } from "./controller/vaccine-controller";

@Module({
  imports: [VaccineProviderModule],
  controllers: [VaccineController],
})
export class VaccineModule {}

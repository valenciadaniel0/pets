import { ErrorValorRequerido } from "src/dominio/errores/error-valor-requerido";
import { ManyToOne } from "typeorm";
import { Pet } from "../../pet/model/pet";

export class Vaccine{
  readonly #name:string;
  readonly #date:string;
  readonly #pet:Pet;  

  constructor(name:string,date:string,pet:Pet){
    this.validateNameRequired(name);
    this.validateDateRequired(date);
    this.#name = name;
    this.#date = date;
    this.#pet = pet;
  }

  private validateNameRequired(name: string) {
    if (!name || name === '') {
      throw new ErrorValorRequerido(
        `The name field is required`,
      );
    }
  }

  private validateDateRequired(date: string) {
    if (!date || date === '') {
      throw new ErrorValorRequerido(
        `The name date is required`,
      );
    }
  }

  get name(): string {
    return this.#name;
  }

  get date(): string {
    return this.#date;
  }

  get pet(): Pet {
    return this.#pet;
  }
}
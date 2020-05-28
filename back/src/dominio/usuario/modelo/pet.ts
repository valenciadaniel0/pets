import { ErrorValorRequerido } from "src/dominio/errores/error-valor-requerido";
import { Vaccine } from "./vaccine";

export class Pet{
  readonly #id:number;
  readonly #name:string;
  readonly #birthDate:string;   
  readonly #vaccines:Vaccine[]; 

  constructor(name:string,birthDate:string,vaccines:Vaccine[]){
      this.validateNameRequired(name);
      this.#name = name;
      this.#birthDate = birthDate;
      this.#vaccines = vaccines;
  }

  private validateNameRequired(name: string) {
      if (!name || name === '') {
        throw new ErrorValorRequerido(
          `The name field is required`,
        );
      }
    }

  get id():number{
    return this.#id;
  }

  get name():string{
    return this.#name;
  }

  get birthDate():string{
    return this.#birthDate;
  }

  get vaccines():Vaccine[]{
    return this.#vaccines;
  }
}
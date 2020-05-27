import { ErrorValorRequerido } from "src/dominio/errores/error-valor-requerido";

export class Pet{
    readonly #name:string;
    readonly #birthDate:string;

    constructor(name:string,birthDate:string){
        this.validateNameRequired(name);
        this.#name = name;
        this.#birthDate = birthDate;
    }

    private validateNameRequired(name: string) {
        if (!name || name === '') {
          throw new ErrorValorRequerido(
            `The name field is required`,
          );
        }
      }

    get name():string{
        return this.#name;
    }

    get birthDate():string{
        return this.#birthDate;
    }
}
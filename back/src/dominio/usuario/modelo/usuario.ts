import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';

const NUMERO_MINIMO_CARACTERES_CLAVE = 4;
export class Usuario {
  readonly #name: string;
  readonly #email: string;
  readonly #password: string;  

  constructor(name: string,email: string, password: string) {
    this.validarTamanoClave(password);
    this.#name = name;
    this.#email = email;
    this.#password = password;    
  }

  private validarTamanoClave(clave: string) {
    if (clave.length < NUMERO_MINIMO_CARACTERES_CLAVE) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la clave debe ser ${NUMERO_MINIMO_CARACTERES_CLAVE}`,
      );
    }
  }

  get name(): string {
    return this.#name;
  }

  get email(): string {
    return this.#email;
  }

  get password(): string {
    return this.#password;
  }
}

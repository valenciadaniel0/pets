import { ErrorLongitudInvalida } from 'src/dominio/excepciones/error-longitud-invalida';

const NUMERO_MINIMO_CARACTERES_CLAVE = 4;

export class Usuario {
  private _nombre: string;
  private _clave: string;
  private _fechaCreacion: Date;

  constructor(nombre: string, clave: string, fechaCreacion: Date) {
    this.validarTamanoClave(clave);
    this._nombre = nombre;
    this._clave = clave;
    this._fechaCreacion = fechaCreacion;
  }

  private validarTamanoClave(clave: string) {
    if (clave.length < NUMERO_MINIMO_CARACTERES_CLAVE) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la clave debe ser ${NUMERO_MINIMO_CARACTERES_CLAVE}`,
      );
    }
  }

  get nombre(): string {
    return this._nombre;
  }

  get clave(): string {
    return this._clave;
  }

  get fechaCreacion(): Date {
    return this._fechaCreacion;
  }
}

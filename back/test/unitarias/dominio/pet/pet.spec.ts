import { Pet } from 'src/dominio/pet/model/pet';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';

describe('Pet', () => {
  const _Pet = Pet as any;

  it('pet with empty name should return an error', () => {
    return expect(async () => new _Pet('', '2020-05-25')).rejects.toStrictEqual(
      new ErrorValorRequerido('The name field is required'),
    );
  });

  it('pet with a non empty name should be stored', () => {
    const pet = new _Pet('Firulais', '2020-05-25');

    expect(pet.name).toEqual('Firulais');
    expect(pet.birthDate).toEqual('2020-05-25');
  });
});

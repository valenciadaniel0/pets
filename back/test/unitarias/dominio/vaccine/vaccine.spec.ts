import { Vaccine } from "src/dominio/vaccine/model/vaccine";
import { ErrorValorRequerido } from "src/dominio/errores/error-valor-requerido";

describe('Vaccine', () => {
  const _Vaccine = Vaccine as any;

  it('vaccine with empty name should return an error', () => {
    return expect(async () => new _Vaccine('',{"id":1}, '2020-05-25')).rejects.toStrictEqual(
      new ErrorValorRequerido('The name field is required'),
    );
  });

  it('vaccine with a non empty name should be stored', () => {
    const pet = new _Vaccine('Parvovirus', {"id":1},'2020-05-25');

    expect(pet.name).toEqual('Parvovirus');
    expect(pet.birthDate).toEqual('2020-05-25');
  });

  it('vaccine with empty date should return an error', () => {
    return expect(async () => new _Vaccine('Parvovirus',{"id":1}, '')).rejects.toStrictEqual(
      new ErrorValorRequerido('The date field is required'),
    );
  });

  it('vaccine with a non empty date should be stored', () => {
    const pet = new _Vaccine('Parvovirus', {"id":1},'2020-05-25');

    expect(pet.name).toEqual('Parvovirus');
    expect(pet.birthDate).toEqual('2020-05-25');
  });
});

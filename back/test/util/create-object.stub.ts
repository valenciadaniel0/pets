import { SinonStubbedInstance, StubbableType, createStubInstance, stub } from 'sinon';

type Func = (...args: any[]) => any;

type StubObjMethodNames<T = undefined> =
  T extends undefined ?
    (ReadonlyArray<string> | { [methodName: string]: any }) :
    (ReadonlyArray<keyof T> | { [P in keyof T]?: T[P] extends Func ? ReturnType<T[P]> : any });

type ResetStub = { _resetStubs(): void }

export type CustomSinonStubbedInstance<T> = SinonStubbedInstance<T> & ResetStub;

function addResetBehaviorToStub<T>(stubbedInstance: SinonStubbedInstance<T>, methodNames: string[]) {
  (stubbedInstance as any)._resetStubs = () => {
    (methodNames as any).forEach((methodName) => {
      stubbedInstance[methodName].reset();
    })
  }
}

export function createCustomStubInstance<T>(constructorClass: StubbableType<T>, overrides?: { [K in keyof T]?: any }): CustomSinonStubbedInstance<T> {
  const stubbedInstance = createStubInstance(constructorClass, overrides);
  addResetBehaviorToStub(stubbedInstance, Object.keys(stubbedInstance));
  return (stubbedInstance as any);
}

export function createStubObj<T>(methodNames: StubObjMethodNames<T>): CustomSinonStubbedInstance<T> {
  const stubbedInstance: any = {};
  (methodNames as any).forEach((methodName) => stubbedInstance[methodName] = stub());
  addResetBehaviorToStub(stubbedInstance, (methodNames as any));
  return stubbedInstance;
}



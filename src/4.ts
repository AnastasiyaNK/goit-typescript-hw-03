interface IKey {
  getSignature: () => number;
}
interface IPerson {
  getKey: () => IKey;
}

class Key implements IKey {
  constructor(private signature: number) {
    this.signature = signature;
  }
  getSignature() {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: IKey) {
    this.key = key;
  }
  getKey() {
    return this.key;
  }
}

abstract class House {
  door: boolean = false;
  key: IKey | null = null;
  tenants: IPerson[] = [];

  comeIn(person: IPerson) {
    if (this.door === true) {
      this.tenants.push(person);
    }
  }
  abstract openDoor(key: IKey): void;
}

class MyHouse extends House {
  constructor(key: IKey) {
    super();
    this.key = key;
  }
  openDoor(key: IKey) {
    if (this.key?.getSignature() === key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key(Math.random());

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};

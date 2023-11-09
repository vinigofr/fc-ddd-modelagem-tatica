import Address from "./address";

export default class Customer {
  // Toda entidade tem um ID
  // Não é possível distinguir um objeto de outro se eles tem ID's iguais
  // Uma entidade por padrão precisará se auto-validar
  // É interessante diferenciar entidades de negócio com entidades de ORM
  // Infra = comunicação externa

  _id: string;
  _name: string;
  _address!: Address;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  // Endereço pode vir em branco e pode ser setado após customer criado (se preferido)
  set Address(address: Address) {
    this._address = address;
  }

  activate() {
    console.log('customer activated/deactivated');
  }
}

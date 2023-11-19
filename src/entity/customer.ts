import Address from "./address";

export default class Customer {
  // Toda entidade tem um ID
  // Não é possível distinguir um objeto de outro se eles tem ID's iguais
  // Uma entidade por padrão precisará se auto-validar
  // É interessante diferenciar entidades de negócio com entidades de ORM
  // Infra = comunicação externa

  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate()
  }

  // Endereço pode vir em branco e pode ser setado após customer criado (se preferido)
  set Address(address: Address) {
    this._address = address;
  }

  get name(): string {
    return this._name
  }

  get id(): string {
    return this._id;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  activate(): void {
    if (!(this._address instanceof Address)) {
      throw new Error("address is mandatory to activate a customer")
    }
    this._active = true
  }

  deactivate(): void {
    this._active = false
  }

  isActive(): boolean {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._id === "") {
      throw new Error("Id is required");
    }

    if (this._name === "") {
      throw new Error("Name is required");
    }
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}

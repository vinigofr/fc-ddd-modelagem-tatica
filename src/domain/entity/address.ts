// Objetos de valor são interessantes quando nos deparamos nas situações que não são espressivas
// Isto é, evitar trabalhar demasiadamente com tipos primitivos
// Ex: CPF não é apenas ums string, e sim um documento brasileiro com várias regras
// Ex: Endereço, endereço tem vários argumentos como Rua, Número, Cidade e Código Postal
// ValuesObjects precisam realizar a auto-validação
// Um ValueObject não possui ID, pois ele não é único
// Objetos de valores são imutáveis

export default class Address {
  _street: string;
  _number: string;
  _zip: string;
  _city: string;

  constructor(street: string, number: string, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  validate() {
    console.log("Some validations here");
  }

  toString() {
    return `${this._street} - ${this._number} - ${this._zip} - ${this._city}`;
  }
}

// O nosso domínio agora está representado através
// da interface abaixo, com os métodos básicos necessários
// para fazer utilização em, por exemplo, um banco de dados

export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
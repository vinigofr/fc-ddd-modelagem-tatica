import Product from "../entity/product";
import RepositoryInterface from "../../@shared/repository/repository.interface";

/* Um pouco de typescript aqui, como herança de interfaces.
 * No arquivo ./repository.interface.ts temos o "BÁSICO"
 * de métodos, para uso mais genérico.
 * Caso a solução implementada no arquivo não atenda, temos
 * a possibilidade de criar uma nova interface que irá "HERDAR"
 * os métodos da interface desejada.
 * 
 * No cenário abaixo, crianos uma nova interface e extendemos
 * da interface genérica, ou seja, teremos todos os métodos de
 * RepositoryInterface + os métodos criados em ProductRepository
 */

export default
  interface ProductRepositoryInterface
  extends RepositoryInterface<Product> { }
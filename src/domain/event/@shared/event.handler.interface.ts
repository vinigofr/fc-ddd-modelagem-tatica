import EventInterface from "./event.interface";

// 1. Criamos uma interface que quando utilizada, deverá implementar o método "handler"
export default interface EventHandlerInterface<T extends EventInterface = EventInterface> {

  /**
   * 2. Quando utilizarmos o método "handler", temos que utilizar como parâmetro algo que
   * implemente a interface EventInterface.
   * O default será EventInterface caso nenhum parâmetro seja passado ao generic
  */
  handler(event: T): void;
}
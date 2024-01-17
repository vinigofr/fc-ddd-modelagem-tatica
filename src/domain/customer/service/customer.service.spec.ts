import SendConsoleLog1Handler from '../event/handler/enviaConsoleLog1.handler';
import SendConsoleLog2Handler from '../event/handler/enviaConsoleLog2.handler';
import EventDispatcher from '../../@shared/event/event.dispatcher';
import Customer from '../entity/customer';
import CustomerService from './customer.service';
import Address from '../value-object/address';
import CustomerRepositoryMock from '../../../infrastructure/customer/mocks/customer.repository.mock';
import SendConsoleLogHandler from '../event/handler/enviaConsoleLog.handler';

describe('Customer Service unit tests', () => {
  test('should send notification about customer creation', async () => {
    // instanciamos o dispatcher
    const eventDispatcher = new EventDispatcher();

    // instanciamos os handlers
    const handler1 = new SendConsoleLog1Handler();
    const handler2 = new SendConsoleLog2Handler();
    const spyHandle1 = jest.spyOn(handler1, 'handler')
    const spyHandle2 = jest.spyOn(handler2, 'handler')

    // Registramos eles no evento em questão
    eventDispatcher.register('CustomerCreatedEvent', handler1)
    eventDispatcher.register('CustomerCreatedEvent', handler2)

    // Instanciamos o repositório
    const customerRepository = new CustomerRepositoryMock()

    // Create a customer
    const customer = new Customer('1', 'Vinicius');
    customer.Address = new Address('street', 'number', 'zip', 'city');
    const customerService = new CustomerService({
      dispatcher: eventDispatcher,
      repository: customerRepository,
    });

    await customerService.create(customer)

    expect(spyHandle1).toHaveBeenCalled()
    expect(spyHandle2).toHaveBeenCalled()
  })

  test('Should send notification about update customer address', async () => {
    // instanciamos o dispatcher
    const eventDispatcher = new EventDispatcher();

    // instanciamos os handlers
    const sendConsoleLogHandler = new SendConsoleLogHandler();
    const spyHandle = jest.spyOn(sendConsoleLogHandler, 'handler')

    // Registramos eles no evento em questão
    eventDispatcher.register('CustomerAddressChangedEvent', sendConsoleLogHandler)

    // Instanciamos o repositório
    const customerRepository = new CustomerRepositoryMock()

    // Change a customer address
    const customerService = new CustomerService({
      dispatcher: eventDispatcher,
      repository: customerRepository,
    });

    await customerService.changeAddress('1', new Address('street', 'number', 'zip', 'city'))

    expect(spyHandle).toHaveBeenCalled()
  })
})
import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe('Customer factory unit tests', () => {
  test('Should create a customer', () => {
    const customer = CustomerFactory.create("Vinicius");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Vinicius");
    expect(customer.Address).toBeUndefined();
  })

  test('Should create a customer with address', () => {
    const customer = CustomerFactory.create("Vinicius");
    expect(customer.Address).toBeUndefined();

    const address = new Address('street', 'number', 'zip', 'city')
    customer.Address = address
    expect(customer.Address).toBeDefined();
  })
})
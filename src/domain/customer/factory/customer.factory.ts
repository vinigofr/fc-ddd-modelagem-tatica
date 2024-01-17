import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import Address from "../value-object/address";

export default abstract class CustomerFactory {
  public static create(name: string, address?: Address): CustomerInterface {
    if (address) {
      const customer = new Customer(uuid(), name);
      customer.Address = address;
      return customer;
    }

    return new Customer(uuid(), name)
  }
}
import { ProductCreatedDomainEvent } from '../../Order/Domain/ProductCreatedDomainEvent';
import { AggregateRoot } from '../../Shared/AggregateRoot';

const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0;
    let v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export class OrderProductEntity extends AggregateRoot {
  name: string;
  price: string;
  constructor(name, price) {
    super();
    this.name = name;
    this.price = price;
  }

  public static create(name, price) {
    const product = new this(name, price);
    product.record(
      new ProductCreatedDomainEvent(
        name,
        price,
        new Date().toDateString(),
        null,
        generateUuid(),
        null
      )
    );

    return product;
  }

  public static createSpecial(name, price) {
    if (!(name.length > 10)) {
      throw new Error('');
    }
    const product = new this(name, price);

    return product;
  }
}

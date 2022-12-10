import { OrderCreatedDomainEvent } from './Events/OrderCreatedDomainEvent';
import { OrderCustomer } from './Entities/OrderCustomer';
import { OrderProductEntity } from './Entities/OrderProductEntity';
import { OrderTimestamp } from './ValueObjects/OrderTimestamp';
import { OrderVisitor } from '../../Order/Domain/OrderVisitor';
import { AggregateRoot } from '../../Shared/AggregateRoot';
import { Visitable } from '../../Shared/Visitable';

const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0;
    let v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export class OrderEntity
  extends AggregateRoot
  implements Visitable<OrderVisitor<any>>
{
  public id: any;
  public paymentType: any;
  public status: any;
  public products: Map<string, OrderProductEntity>;
  public customer: OrderCustomer;
  public timestamp: OrderTimestamp;

  private constructor(id, paymentType, status, products, customer, timestamp) {
    super();
    this.id = id;
    this.paymentType = paymentType;
    this.status = status;
    this.products = products;
    this.customer = customer;
    this.timestamp = timestamp;
  }

  public accept<T>(visitor: OrderVisitor<T>): T {
    return visitor.visit(this);
  }

  static create(
    id,
    paymentType,
    status,
    address,
    phone,
    userId,
    createdAt,
    updatedAt
  ) {
    const order = new this(
      id,
      paymentType,
      status,
      new Map<string, OrderProductEntity>(),
      new OrderCustomer(userId, address, phone),
      new OrderTimestamp(createdAt, updatedAt)
    );
    order.record(new OrderCreatedDomainEvent(order, generateUuid(), null));
    return order;
  }

  public addProduct(product: { name: string; price: string }) {
    const _product = OrderProductEntity.create(product.name, product.name);
    this.products.set(_product.name, _product);
    this.recordMany(_product.pullDomainEvents());
  }

  public removeProduct(productName: string) {
    this.products.delete(productName);
  }

  public getProductNames(): string[] {
    return Array.from(this.products.keys());
  }

  public changeProductName(productName: string, newProductName: string) {
    const product = this.products.get(productName);
    product.changeName(newProductName)
  }

  public toPrimitives() {
    return {
      id: this.id,
      paymentType: this.paymentType,
      status: this.status,
      products: this.products,
      customer: this.customer.toPrimitives(),
      timestamp: this.timestamp.value(),
    };
  }
}

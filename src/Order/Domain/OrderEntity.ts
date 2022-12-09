import { OrderCreatedDomainEvent } from '../../Order/Domain/OrderCreatedDomainEvent';
import { OrderCustomer } from '../../Order/Domain/OrderCustomer';
import { OrderProductEntity } from '../../Order/Domain/OrderProductEntity';
import { OrderTimestamp } from '../../Order/Domain/OrderTimestamp';
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
  implements Visitable<OrderVisitor>
{
  public id: any;
  public paymentType: any;
  public status: any;
  public products: any;
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

  public accept<TypeResponse>(
    visitor: OrderVisitor<TypeResponse>
  ): TypeResponse {
    return visitor.visit(this);
  }

  static create(
    id,
    paymentType,
    status,
    products,
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
      products,
      new OrderCustomer(userId, address, phone),
      new OrderTimestamp(createdAt, updatedAt)
    );
    order.record(new OrderCreatedDomainEvent(order, generateUuid(), null));
    return order;
  }

  public addProduct(product: { name: string; price: string }) {
    const _product = OrderProductEntity.create(product.name, product.name);
    this.products = [...this.products, _product];
    this.recordMany(_product.pullDomainEvents());
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

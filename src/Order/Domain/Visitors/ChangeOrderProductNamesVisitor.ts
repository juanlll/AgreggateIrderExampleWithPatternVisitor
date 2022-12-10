import { OrderProductEntity } from '../Entities/OrderProductEntity';
import { OrderEntity } from '../OrderEntity';
import { OrderVisitor } from '../OrderVisitor';

export class ChangeOrderProductNamesVisitor implements OrderVisitor<void> {
  public visit(order: OrderEntity): void {
    order.products.forEach((orderProduct: OrderProductEntity) => {
      orderProduct.changeName(`${orderProduct} (NEW)`)
    })
  }
}

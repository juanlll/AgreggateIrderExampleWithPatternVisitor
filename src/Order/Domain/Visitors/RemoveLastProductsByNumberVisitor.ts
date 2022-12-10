import { OrderEntity } from '../OrderEntity';
import { OrderVisitor } from '../OrderVisitor';

export class RemoveLastProductsByNumberVisitor implements OrderVisitor<void> {

  public visit(order: OrderEntity): void {
    const c = Math.abs(order.getProductNames().length / 2)
    order.getProductNames().slice(0, -c).forEach((name: string) => {
      order.removeProduct(name)
    })
  }


}

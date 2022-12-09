import { OrderEntity } from '../../Order/Domain/OrderEntity';
import { OrderVisitor } from '../../Order/Domain/OrderVisitor';

export class RemoveOrderProductsVisitor implements OrderVisitor<void> {
  constructor(private products: Array<{ name: string; price: string }>) {}
  public visit(order: OrderEntity): void {
    this.products.forEach((p: { name: string; price: string }) => {
      order.addProduct({ name: p.name, price: p.price });
    });
  }
}

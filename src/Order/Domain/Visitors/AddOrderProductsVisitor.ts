import { OrderEntity } from '../OrderEntity';
import { OrderVisitor } from '../OrderVisitor';

export class AddOrderProductsVisitor implements OrderVisitor<void> {
  constructor(private products: Array<{ name: string; price: string }>) { }
  public visit(order: OrderEntity): void {
    this.products.forEach((product: { name: string; price: string }) => {
      order.addProduct({ name: product.name, price: product.price })
    });
  }
}

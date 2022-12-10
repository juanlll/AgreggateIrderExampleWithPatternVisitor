import { OrderEntity } from '../OrderEntity';
import { OrderVisitor } from '../OrderVisitor';

export class GetTotalOrderProductsVisitor implements OrderVisitor<number> {
  public visit(order: OrderEntity): number {
    return Array.isArray(order?.products) ? order?.products.length : 0;
  }
}

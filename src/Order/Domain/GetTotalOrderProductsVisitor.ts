import { OrderEntity } from '../../Order/Domain/OrderEntity';
import { OrderVisitor } from '../../Order/Domain/OrderVisitor';

export class GetTotalOrderProductsVisitor implements OrderVisitor {
  public visit(order: OrderEntity): number {
    return Array.isArray(order?.products) ? order?.products.length : 0;
  }
}

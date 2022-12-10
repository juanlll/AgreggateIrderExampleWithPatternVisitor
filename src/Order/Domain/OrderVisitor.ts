import { OrderEntity } from '../../Order/Domain/OrderEntity';

export interface OrderVisitor<T> {
  visit(order: OrderEntity): T
}

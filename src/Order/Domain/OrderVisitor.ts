import { OrderEntity } from '../../Order/Domain/OrderEntity';

export interface OrderVisitor<TypeResponse> {
  visit(order: OrderEntity): TypeResponse;
}

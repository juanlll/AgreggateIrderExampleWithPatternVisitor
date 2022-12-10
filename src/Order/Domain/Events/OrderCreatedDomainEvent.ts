import { OrderEntity } from '../OrderEntity';
import { DomainEvent } from '../../../Shared/Event';

export class OrderCreatedDomainEvent extends DomainEvent {
  private properties: any = {};

  constructor(order: OrderEntity, eventId, occurredOn) {
    super(order.id, 'order.created', eventId, occurredOn);
    this.properties = order.toPrimitives();
  }

  public toPrimitives() {
    return {
      ...super.toPrimitives(),
      type: this.type,
      attributes: this.properties,
    };
  }

  public getEventName() {
    return OrderCreatedDomainEvent.eventName();
  }

  public static eventName() {
    return 'order.created';
  }
}

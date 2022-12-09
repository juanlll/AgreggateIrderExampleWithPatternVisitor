import { OrderEntity } from '../../Order/Domain/OrderEntity';
import { DomainEvent } from '../../Shared/Event';

export class OrderCreatedDomainEvent extends DomainEvent {
  private properties: any = {};

  constructor(order: OrderEntity, eventId, occurredOn) {
    super(order.id, 'order.created', eventId, occurredOn);
    this.properties = order.toPrimitives();
  }

  get id() {
    return this.properties['id'];
  }

  get paymentType() {
    return this.properties['paymentType'];
  }

  get status() {
    return this.properties['status'];
  }

  get products() {
    return this.properties['products'];
  }

  get address() {
    return this.properties['address'];
  }

  get phone() {
    return this.properties['phone'];
  }

  get userId() {
    return this.properties['userId'];
  }

  public toPrimitives() {
    return {
      eventId: this.eventId,
      type: this.type,
      occurredOn: this.occurredOn,
      aggregateId: this.aggregateId,
      attributes: this.properties,
      meta: {
        hostname: 'server_api_orders',
        ip: '192.312.422.30',
      },
    };
  }

  public getEventName() {
    return OrderCreatedDomainEvent.eventName();
  }

  public static eventName() {
    return 'order.created';
  }
}

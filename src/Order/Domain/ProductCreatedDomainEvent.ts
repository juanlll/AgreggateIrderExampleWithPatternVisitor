import { DomainEvent } from '../../Shared/Event';

const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0;
    let v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export class ProductCreatedDomainEvent extends DomainEvent {
  private properties: any = {};

  constructor(name, price, createdAt, updatedAt, eventId, occurredOn) {
    super(name, 'product.created', eventId, occurredOn);
    this.properties = {
      name: name,
      price: price,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  }

  get name() {
    return this.properties['name'];
  }

  get price() {
    return this.properties['price'];
  }

  toPrimitives() {
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

  getEventName() {
    return 'product.created';
  }

  static eventName() {
    return 'product.created';
  }
}

import { DomainEvent } from '../../../Shared/Event';

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
  public toPrimitives() {
    return {
      ...super.toPrimitives(),
      type: this.type,
      attributes: this.properties,
    };
  }

  public getEventName() {
    return ProductCreatedDomainEvent.eventName();
  }

  static eventName() {
    return 'product.created';
  }
}

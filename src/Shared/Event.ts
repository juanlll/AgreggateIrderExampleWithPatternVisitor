'use strict';

import { AggregateRoot } from '../Shared/AggregateRoot';

/** Abstract Class DTO*/
export abstract class DomainEvent {
  protected eventId: any;
  protected aggregateId: any;
  protected type: any;
  protected occurredOn: any;

  constructor(aggregateId, type, eventId, occurredOn) {
    this.eventId = eventId;
    this.aggregateId = aggregateId;
    this.type = type;
    this.occurredOn = occurredOn ? occurredOn : new Date().toISOString();
  }

  toPrimitives() {
    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      occurredOn: this.occurredOn,
    };
  }
}

class OrderCreatedDomainEvent extends DomainEvent {
  private properties: any = {};

  constructor(
    id,
    paymentType,
    status,
    products,
    address,
    phone,
    userId,
    createdAt,
    updatedAt,
    eventId,
    occurredOn
  ) {
    super(id, 'order.created', eventId, occurredOn);
    this.properties = {
      id: id,
      paymentType: paymentType,
      status: status,
      products: products,
      address: address,
      phone: phone,
      userId: userId,
      createdAt: createdAt,
      updatedAt,
    };
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
    return 'order.created';
  }

  static eventName() {
    return 'order.created';
  }
}

class OrderEntity extends AggregateRoot {
  id: any;
  paymentType: any;
  status: any;
  products: any;
  address: any;
  phone: any;
  userId: any;
  createdAt: any;
  updatedAt: any;
  constructor(
    id,
    paymentType,
    status,
    products,
    address,
    phone,
    userId,
    createdAt,
    updatedAt
  ) {
    super();
    this.id = id;
    this.paymentType = paymentType;
    this.status = status;
    this.products = products;
    this.address = address;
    this.phone = phone;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(
    id,
    paymentType,
    status,
    products,
    address,
    phone,
    userId,
    createdAt,
    updatedAt
  ) {
    const order = new this(
      id,
      paymentType,
      status,
      products,
      address,
      phone,
      userId,
      createdAt,
      updatedAt
    );
    order.record(
      new OrderCreatedDomainEvent(
        id,
        paymentType,
        status,
        products,
        address,
        phone,
        userId,
        createdAt,
        updatedAt,
        'b201813a-2db7-4703-a9aa-68f6b4a4a488',
        null
      )
    );
    return;
  }
}

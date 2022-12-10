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

  public toPrimitives() {
    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      occurredOn: this.occurredOn,
    };
  }
}
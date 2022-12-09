export class AggregateRoot {
  domainEvents = [];

  pullDomainEvents() {
    const domainEvents = this.domainEvents;
    this.domainEvents = [];
    return domainEvents;
  }

  record(domainEvent) {
    this.domainEvents = [...this.domainEvents, domainEvent];
  }

  recordMany(domainEventsMany) {
    this.domainEvents = this.domainEvents.concat([...domainEventsMany]);
  }
}

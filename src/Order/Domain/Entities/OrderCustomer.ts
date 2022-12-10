import { AggregateRoot } from '../../../Shared/AggregateRoot';

export class OrderCustomer extends AggregateRoot {
  constructor(public userId: any, public address: any, public phone: any) {
    super();
  }

  public toPrimitives() {
    return {
      userId: this.userId,
      address: this.address,
      phone: this.phone,
    };
  }
}

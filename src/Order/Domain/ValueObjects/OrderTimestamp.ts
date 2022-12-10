export class OrderTimestamp {
  constructor(public createdAt: string, public updatedAt: string) {}
  public value() {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

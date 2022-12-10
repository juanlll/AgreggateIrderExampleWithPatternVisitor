import { OrderEntity } from "../Domain/OrderEntity";
import { AddOrderProductsVisitor } from "../Domain/Visitors/AddOrderProductsVisitor";
import { ChangeOrderProductNamesVisitor } from "../Domain/Visitors/ChangeOrderProductNamesVisitor";
import { GetTotalOrderProductsVisitor } from "../Domain/Visitors/GetTotalOrderProductsVisitor";
import { RemoveLastProductsByNumberVisitor } from "../Domain/Visitors/RemoveLastProductsByNumberVisitor";

export class PlaceOrderUseCase {

    constructor(private getTotalOrderProductsVisitor: GetTotalOrderProductsVisitor) {

    }
    public __invoke(data: any): number {

        const order: OrderEntity = OrderEntity.create(
            data.id,
            data.paymentType,
            data.status,
            data.address,
            data.phone,
            data.userId,
            data.createdAt,
            null
        );

        order.accept<void>(new AddOrderProductsVisitor(data.products));
        console.log(order.getProductNames());
        order.accept<void>(new ChangeOrderProductNamesVisitor())
        console.log(order.getProductNames());
        //persistenceRepo.save(order);
        //repo.publish(order.pullDomainEvents())

        return order.accept<number>(this.getTotalOrderProductsVisitor);

    }
}
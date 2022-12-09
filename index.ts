import { AddOrderProductsVisitor } from './src/Order/Domain/AddOrderProductsVisitor';
import { GetTotalOrderProductsVisitor } from './src/Order/Domain/GetTotalOrderProductsVisitor';
import { OrderEntity } from './src/Order/Domain/OrderEntity';

const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0;
    let v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

//peticion http orden
// createOrderUseCase(dataOrder)

// hace la creacion de la orden => ordern crea los productos
const orderEntity: OrderEntity = OrderEntity.create(
  generateUuid(),
  'ECARD',
  'ACTIVE',
  [],
  'carrera 123w',
  '+573422313323',
  'baafbc00-99bf-4dd5-937c-8e025c39b835',
  new Date().toDateString(),
  null
);

let productos = [];
for (let i = 0; i <= 3; i++) {
  productos = [
    ...productos,
    {
      name: 'producto #' + i,
      price: i + '000',
    },
  ];
}
const getTotalOrderProductsVisitor = new GetTotalOrderProductsVisitor();

console.log(
  'TotalProductos:',
  orderEntity.accept<number>(getTotalOrderProductsVisitor)
);

const addOrderProductsVisitor = new AddOrderProductsVisitor(productos);
orderEntity.accept<void>(addOrderProductsVisitor);

console.log(
  'TotalProductos:',
  orderEntity.accept<number>(getTotalOrderProductsVisitor)
);

console.log('EventosDeDominio:', orderEntity.pullDomainEvents());

import { AddOrderProductsVisitor } from './src/Order/Domain/Visitors/AddOrderProductsVisitor';
import { GetTotalOrderProductsVisitor } from './src/Order/Domain/Visitors/GetTotalOrderProductsVisitor';
import { OrderEntity } from './src/Order/Domain/OrderEntity';
import { PlaceOrderUseCase } from './src/Order/Application/PlaceOrderUseCase';
const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0;
    let v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const total = new PlaceOrderUseCase(new GetTotalOrderProductsVisitor()).__invoke({
  id: generateUuid(),
  paymentType: 'VISA',
  status: 'ACTIVE',
  address: 'carrera 123w',
  phone: '+573422313323',
  products: generateProducts(10),
  userId: 'baafbc00-99bf-4dd5-937c-8e025c39b835',
  createdAt: new Date().toISOString()
});

console.log(total)

function generateProducts(num: number) {
  let products = [];
  for (let i = 0; i < num; i++) {
    products = [
      ...products,
      {
        name: 'producto #' + i,
        price: i + '000',
      },
    ];
  }
  return products;
}

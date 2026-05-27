import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { Buyer } from './components/models/Buyer';
import { Basket } from './components/models/Basket';
import { Catalog } from './components/models/Catalog';

const catalog = new Catalog();
catalog.setProducts(apiProducts.items);
console.log('Массив товаров из каталога: ', catalog.getProducts());
const productId = apiProducts.items[0]?.id;
console.log(`Поиск товара по ID = ${productId}:`, catalog.getProductById(productId));
catalog.setSelectedProduct(apiProducts.items[1]);
console.log('Выбранный товар:', catalog.getSelectedProduct());

const basket = new Basket();
basket.addProduct(apiProducts.items[0]);
basket.addProduct(apiProducts.items[1]);
console.log('Товары в корзине:', basket.getSelectedProducts());
console.log('Количество товаров в корзине:', basket.getProductsCount());
console.log('Общая стоимость корзины:', basket.getTotalPrice());
console.log(`Есть ли товар с ID = ${productId} в корзине?`, basket.hasProductInBasket(productId));
basket.deleteProduct(apiProducts.items[0]);
console.log('После удаления товара, количество товаров:', basket.getProductsCount());
basket.clearBasket();
console.log('После очистки корзины, количество товаров:', basket.getProductsCount());

const buyer = new Buyer();
buyer.setPayment('card');
buyer.setEmail('test@yandex.ru');
buyer.setPhone('+79123456789');
buyer.setAddress('г. Архангельск, ул. Победы, д. 1, кв. 1');
console.log('Данные покупателя после заполнения:', buyer.getBuyerData());
console.log('Проверка заполненных данных:', buyer.validateBuyerData());
buyer.clearBuyerData();
console.log('Проверка данных покупателя после очистки:', buyer.validateBuyerData());

import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { Buyer } from './components/models/Buyer';
import { Basket } from './components/models/Basket';
import { Catalog } from './components/models/Catalog';
import { Api } from './components/base/Api';
import { AppApi } from './components/services/AppApi';
import { API_URL } from './utils/constants';

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

const baseApi = new Api(API_URL);
const api = new AppApi(baseApi);
console.log('URL сервера:', API_URL);
api
  .getProducts()
  .then((data) => {
    console.log('Ответ от сервера получен!');
    console.log('Всего товаров:', data.total);
    console.log('Массив товаров с сервера:', data.items);
    catalog.setProducts(data.items);
    console.log('Товары в каталоге после загрузки с сервера:', catalog.getProducts());
    console.log('Количество товаров в каталоге:', catalog.getProducts().length);
  })
  .catch((error) => {
    console.error('Ошибка при загрузке товаров с сервера:', error);
  });

import './scss/styles.scss';
import { Buyer } from './components/models/Buyer';
import { Basket } from './components/models/Basket';
import { Catalog } from './components/models/Catalog';
import { Api } from './components/base/Api';
import { AppApi } from './components/services/AppApi';
import { API_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { HeaderComponent } from './components/views/HeaderComponent';
import { ModalComponent } from './components/views/ModalComponent';
import { CatalogComponent } from './components/views/CatalogComponent';
import { CardCatalogComponent } from './components/views/CardCatalogComponent';
import { CardBasketComponent } from './components/views/CardBasketComponent';
import { CardPreviewComponent } from './components/views/CardPreviewComponent';
import { OrderSuccessComponent } from './components/views/OrderSuccessComponent';

const events = new EventEmitter();

const buyer = new Buyer();
const basket = new Basket();
const catalog = new Catalog();

const baseApi = new Api(API_URL);
const api = new AppApi(baseApi);

api
  .getProducts()
  .then((data) => {
    catalog.setProducts(data.items);
  })
  .catch((error) => {
    console.error('Ошибка при загрузке товаров с сервера:', error);
  });

const headerComponent = new HeaderComponent(ensureElement<HTMLElement>('.header'), events);
const modalComponent = new ModalComponent(ensureElement<HTMLElement>('.modal'), events);
const catalogComponent = new CatalogComponent(ensureElement<HTMLElement>('.gallery'));

const cardCatalogComponent = new CardCatalogComponent(cloneTemplate<HTMLElement>('#card-catalog'), events);
const cardBasketComponent = new CardBasketComponent(cloneTemplate<HTMLElement>('#card-basket'), events);
const cardPreviewComponent = new CardPreviewComponent(cloneTemplate<HTMLElement>('#card-preview'), events);

// const main = ensureElement<HTMLElement>('.gallery');
// console.log(catalog);
// main.replaceChildren(cardPreviewComponent.render({
//     "description": "Будет стоять над душой и не давать прокрастинировать.",
//     "image": "/Asterisk_2.svg",
//     "title": "Мамка-таймер",
//     "category": "софт-скил",
//     "price": null
// }))
// modalComponent.render();
// modalComponent.open();

// запрещаем скролл при открытии модального окна
events.on('modal:open', () => {
    document.body.style.overflow = 'hidden';  
});

// возвращаем скролл при закрытии модального окна
events.on('modal:close', () => {
    document.body.style.overflow = '';  
});
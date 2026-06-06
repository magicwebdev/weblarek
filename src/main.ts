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
import { CardPreviewComponent } from './components/views/CardPreviewComponent';
import { CardBasketComponent } from './components/views/CardBasketComponent';
import { FormContactsComponent } from './components/views/FormContactsComponent';
import { FormOrderComponent } from './components/views/FormOrderComponent';
import { BasketComponent } from './components/views/BasketComponent';
import { OrderSuccessComponent } from './components/views/OrderSuccessComponent';
import { TPayment } from './types';

const events = new EventEmitter();
const buyer = new Buyer(events);
const basket = new Basket(events);
const catalog = new Catalog(events);
const baseApi = new Api(API_URL);
const api = new AppApi(baseApi);

const headerComponent = new HeaderComponent(ensureElement<HTMLElement>('.header'), events);
const modalComponent = new ModalComponent(ensureElement<HTMLElement>('.modal'), events);
const catalogComponent = new CatalogComponent(ensureElement<HTMLElement>('.page'));

const cardCatalogElement = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewElement = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketElement = ensureElement<HTMLTemplateElement>('#card-basket');
const basketElement = ensureElement<HTMLTemplateElement>('#basket');
const formOrderElement = ensureElement<HTMLTemplateElement>('#order');
const formContactsElement = ensureElement<HTMLTemplateElement>('#contacts');
const orderSuccessElement = ensureElement<HTMLTemplateElement>('#success');

const сardPreviewTemplate = cloneTemplate<HTMLElement>(cardPreviewElement);
const basketTemplate = cloneTemplate<HTMLElement>(basketElement);
const formOrderTemplate = cloneTemplate<HTMLFormElement>(formOrderElement);
const formContactsTemplate = cloneTemplate<HTMLFormElement>(formContactsElement);
const orderSuccessTemplate = cloneTemplate<HTMLElement>(orderSuccessElement);

const cardPreviewComponent = new CardPreviewComponent(сardPreviewTemplate, events);
const basketComponent = new BasketComponent(basketTemplate, events);
const formOrderComponent = new FormOrderComponent(formOrderTemplate, events);
const formContactsComponent = new FormContactsComponent(formContactsTemplate, events);
const orderSuccessComponent = new OrderSuccessComponent(orderSuccessTemplate, events);

// загрузка товаров с сервера
api
  .getProducts()
  .then((data) => {
    catalog.setProducts(data.items);
  })
  .catch((error) => {
    console.error('Ошибка при загрузке товаров с сервера:', error);
  });

// изменение каталога товаров
events.on('catalog:change', () => {
  const products = catalog.getProducts();
  const cards = products.map((product) => {
    const cardTemplate = cloneTemplate<HTMLElement>(cardCatalogElement);
    const card = new CardCatalogComponent(cardTemplate, {
      onClick: () => {
        events.emit('card:click', { id: product.id });
      },
    });
    return card.render(product);
  });
  catalogComponent.content = cards;
});

// выбор карточки для просмотра
events.on('card:click', (data: { id: string }) => {
  const product = catalog.getProductById(data.id);
  if (product === null) {
    return;
  }
  catalog.setSelectedProduct(product);
});

// отображение выбранной карточки
events.on('product:select', () => {
  const product = catalog.getSelectedProduct();
  if (product === null) {
    return;
  }
  const isInBasket = basket.hasProductInBasket(product.id);
  const buttonDisabled = product.price === null;
  const buttonText = buttonDisabled ? 'Недоступно' : isInBasket ? 'Удалить из корзины' : 'Купить';
  modalComponent.render({
    content: cardPreviewComponent.render({ ...product, isInBasket, buttonText, buttonDisabled }),
  });
  modalComponent.open();
});

// нажатие кнопки в превью карточки
events.on('preview:toggle', () => {
  const product = catalog.getSelectedProduct();
  if (product === null) {
    return;
  }
  const isInBasket = basket.hasProductInBasket(product.id);
  if (isInBasket) {
    basket.deleteProduct(product);
  } else {
    basket.addProduct(product);
  }
  modalComponent.close();
});

// обновление корзины
events.on('basket:change', () => {
  headerComponent.render({
    counter: basket.getProductsCount(),
  });
});

// рендер корзины
const renderBasket = () => {
  const products = basket.getSelectedProducts();
  const basketCards = products.map((product, index) => {
    const cardTemplate = cloneTemplate<HTMLElement>(cardBasketElement);
    const card = new CardBasketComponent(cardTemplate, {
      onClick: () => {
        events.emit('basket:remove', { id: product.id });
      },
    });
    return card.render({ ...product, index: index + 1 });
  });
  const basketTotal = basket.getTotalPrice();
  modalComponent.render({
    content: basketComponent.render({
      content: basketCards,
      total: basketTotal,
      buttonDisabled: basketTotal <= 0,
    }),
  });
  modalComponent.open();
};

// нажатие кнопки открытия корзины
events.on('basket:open', () => {
  renderBasket();
});

// нажатие кнопки удаления товара в корзине
events.on('basket:remove', (data: { id: string }) => {
  const product = catalog.getProductById(data.id);
  if (product === null) {
    return;
  }
  basket.deleteProduct(product);
  renderBasket();
});

// оформление заказа
events.on('basket:order', () => {
  modalComponent.render({
    content: formOrderComponent.render({
      ...buyer,
      isValid: false,
      errors: '',
    }),
  });
});

// изменение способа оплаты
events.on('payment:change', (data: { payment: TPayment }) => {
  buyer.setPayment(data.payment);
});

// изменение адреса
events.on('address:change', (data: { address: string }) => {
  buyer.setAddress(data.address);
});

// изменение email
events.on('email:change', (data: { email: string }) => {
  buyer.setEmail(data.email);
});

// изменение телефона
events.on('phone:change', (data: { phone: string }) => {
  buyer.setPhone(data.phone);
});

// изменеие данных покупателя
events.on('buyer:change', () => {
  const buyerData = buyer.getBuyerData();
  const errors = buyer.validateBuyerData();
  formOrderComponent.render({
    ...buyerData,
    isValid: !errors.payment && !errors.address,
    errors: errors.payment || errors.address || '',
  });
  formContactsComponent.render({
    ...buyerData,
    isValid: !errors.email && !errors.phone,
    errors: errors.email || errors.phone || '',
  });
});

// переход ко второй форме оформления заказа
events.on('order:submit', () => {
  modalComponent.render({
    content: formContactsComponent.render({
      ...buyer,
      isValid: false,
      errors: '',
    }),
  });
});

// оформление заказа
events.on('contacts:submit', () => {
  api
    .postOrder({
      items: basket.getSelectedProducts().map((product) => product.id),
      total: basket.getTotalPrice(),
      ...buyer.getBuyerData(),
    })
    .then((result) => {
      basket.clearBasket();
      buyer.clearBuyerData();
      modalComponent.render({
        content: orderSuccessComponent.render({
          total: result.total,
        }),
      });
    })
    .catch((error) => {
      console.log('Ошибка при оформления заказа:', error);
    });
});

// завершение оформления заказа
events.on('success:close', () => {
  modalComponent.close();
});

// запрещаем скролл при открытии модального окна
events.on('modal:open', () => {
  document.body.style.overflow = 'hidden';
});

// возвращаем скролл при закрытии модального окна
events.on('modal:close', () => {
  document.body.style.overflow = '';
});

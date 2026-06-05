export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export type TPayment = 'card' | 'cash' | '';

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IOrderData extends IBuyer {
  total: number;
  items: string[];
}

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export interface IHeader {
  counter: number;
}

export interface IModal {
  content: HTMLElement;
}

export interface ICatalog {
  content: HTMLElement[];
}

export type TCard = Pick<IProduct, 'title' | 'price'>;

export type TCardCatalog = TCard & Pick<IProduct, 'category' | 'image'>;

export type TCardPreview = TCardCatalog &
  Pick<IProduct, 'description'> & {
    inBasket: boolean;
  };

export type TCardBasket = TCard & {
  index: number;
};

export interface IOrderSuccess {
  total: number;
}

export interface IForm {
  isValid: boolean;
  error: string;
}

export type TFormContacts = IForm & Pick<IBuyer, 'email' | 'phone'>;

export type TFormOrder = IForm & Pick<IBuyer, 'payment' | 'address'>;

export interface IBasket {
  content: HTMLElement[];
  total: number;
}
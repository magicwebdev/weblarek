import { Component } from '../base/Component';
import { ICatalog } from '../../types';

export class CatalogComponent extends Component<ICatalog> {
  constructor(container: HTMLElement) {
    super(container);    
  }

  set content(value: HTMLElement[]) {
    this.container.replaceChildren(...value);
  }
}

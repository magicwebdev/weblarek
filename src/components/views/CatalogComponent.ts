import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { ICatalog } from '../../types';

export class CatalogComponent extends Component<ICatalog> {
  protected galleryElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.galleryElement = ensureElement<HTMLElement>('.gallery', this.container);
  }

  set content(value: HTMLElement[]) {
    this.galleryElement.replaceChildren(...value);
  }
}

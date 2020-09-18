import { eventEmitter } from '../../../events/EventEmitter';
import { ITEM_CREATED } from '../../../constants/events';
import { Cell } from '../../../common/Cell';
import { itemsStorage } from '../../../storage/items.storage';
import { Item } from '../types/item.type';
import { ITEMS_LIST_ELEMENT_ID, ITEM_ELEMENT_ID } from '../../../constants/elements.id';

class ItemsView {
  constructor() {
    eventEmitter.on(ITEM_CREATED, this.drawNewItem);
  }

  drawItemsList(destination: HTMLElement) {
    // отрисовка списка рецептов
    const itemsBlock = document.createElement('div');
    // заголовок
    const itemsName = document.createElement('h3');
    itemsName.textContent = 'Items';

    const itemsList = document.createElement('div');
    itemsList.id = ITEMS_LIST_ELEMENT_ID;
    itemsList.classList.add('container');

    itemsStorage.list().forEach(item => {
      let cell = Cell.createElement(`${ITEM_ELEMENT_ID}#${item.id}`, item.name, {
        draggable: true,
      });
      itemsList.appendChild(cell);
    });

    itemsBlock.appendChild(itemsName);
    itemsBlock.appendChild(itemsList);

    destination.appendChild(itemsBlock);
  }

  drawNewItem(item: Item) {
    let itemListElement = document.getElementById(ITEMS_LIST_ELEMENT_ID);
    let itemElement = Cell.createElement(`${ITEM_ELEMENT_ID}#${item.id}`, item.name, {
      draggable: true,
    });

    itemListElement.appendChild(itemElement);
  }
}

export let itemsView = new ItemsView();

import { drag } from '../../../events/dragAndDropEvents/index';
import { Cell } from '../../../helpers/Cell';
import { items } from '../../../storage/items.storage';
import { Item } from '../types/item.type';

class ItemsView {
  
  createItemsList(): HTMLElement {
  // отрисовка списка рецептов
  const itemsBlock = document.createElement('div');
  // заголовок
  const itemsName = document.createElement('h3');
  itemsName.textContent = 'Items';

  const itemsList = document.createElement('div');
  itemsList.style.padding = '20px';
  itemsList.style.border = 'solid #00FF00 1px';

  items.forEach((element) => {
    let cell = new Cell(`item#${element.id}`, element.name);
    let cellElement = cell.createElement();
    cellElement.draggable = true;
    cellElement.ondrag = drag;
    itemsList.appendChild(cellElement);
  })

  itemsBlock.appendChild(itemsName);
  itemsBlock.appendChild(itemsList);

  return itemsBlock;
}

  drawNewItem(item: Item) {
    // document.get('items')
    // ...
  }
}

export let itemsView = new ItemsView();

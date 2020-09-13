import { items } from '../../../storage/items.storage';
import { count } from '../../../helpers/counter';
import { Item } from '../types/item.type';

class ItemsModel {
  addItem(name: string): Item {
    let item: Item = { id: count(), name };
    items.push(item);

    return item;
  }
}

export let itemsModel = new ItemsModel();

import { items } from '../../../storage/items.storage';
import { count } from '../../../helpers/counter';
import { Item } from '../types/item.type';

class ItemsModel {
  createItem(name: string): Item {
    let item: Item = { id: count(), name };
    items.push(item);

    return item;
  }

  getById(id: number) {
    return items.find(item => item.id == id);
  }
}

export let itemsModel = new ItemsModel();

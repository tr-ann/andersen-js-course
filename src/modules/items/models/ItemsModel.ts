import { itemsStorage } from '../../../storage/items.storage';
import { counter } from '../../../helpers/counter';
import { Item } from '../types/item.type';

class ItemsModel {
  private count = counter(itemsStorage.length + 1);

  createItem(name: string): Item {
    let item: Item = { id: this.count(), name };
    if (itemsStorage.list().some((item) => item.name == name)) {
      throw new Error('Такой элемент уже существует');
    }

    itemsStorage.add(item);

    return item;
  }

  getById(id: number) {
    return itemsStorage.list().find(item => item.id == id);
  }
}

export let itemsModel = new ItemsModel();

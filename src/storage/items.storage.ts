import { Item } from "../modules/items/types/item.type";

class ItemsStorage {
  private items: Array<Item> = [{
    id: 1,
    name: 'item1',
  },
  {
    id: 2,
    name: 'item2',
  },
  {
    id: 3,
    name: 'item3',
  },];

  public list() {
    return this.items;
  }

  public add(item: Item) {
    this.items.push(item);
  }

  get length() {
    return this.items.length;
  }

}

export let itemsStorage = new ItemsStorage();

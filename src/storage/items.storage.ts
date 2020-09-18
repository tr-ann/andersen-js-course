import { ITEM_CREATED } from "../constants/events";
import { eventEmitter } from "../events/EventEmitter";
import { Item } from "../modules/items/types/item.type";

class ItemsStorage {
  private items: Array<Item> = [];

  constructor() {
    let itemsFromStorage = localStorage.getItem('items');

    if (itemsFromStorage) {
      this.items = JSON.parse(itemsFromStorage);
    } else {
      this.items = basicItems.map((value) => {return {...value}});
    }

    eventEmitter.on(ITEM_CREATED, this.saveToLocalStorage.bind(this));
  }

  public list() {
    return this.items;
  }

  public add(item: Item) {
    this.items.push(item);
  }

  get length() {
    return this.items.length;
  }

  private saveToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(this.items).toString());
  }

}

const basicItems = [
  {
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
  }
]

export let itemsStorage = new ItemsStorage();

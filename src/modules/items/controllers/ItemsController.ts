import { eventEmitter } from '../../../events/EventEmitter';
import { ITEM_CREATED } from '../../../constants/events';
import { itemsModel } from '../models/ItemsModel';

class ItemsController {
  constructor() {}

  addItem(name: string) {
    let item = itemsModel.createItem(name);

    eventEmitter.emit(ITEM_CREATED, item);
  }
}

export let itemsController = new ItemsController();

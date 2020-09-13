import { itemsModel } from '../models/ItemsModel';
import { itemsView } from '../views/ItemsView';

class ItemsController {
  addItem(name: string) {
    let item = itemsModel.addItem(name);
    itemsView.drawNewItem(item);
  }
}

export let itemsController = new ItemsController();

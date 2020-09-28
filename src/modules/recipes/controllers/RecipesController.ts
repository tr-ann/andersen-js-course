import { eventEmitter } from '../../../events/EventEmitter';
import { recipesModel } from '../models/RecipesModel';
import { RECIPE_CREATED } from '../../../constants/events';
import { Item } from '../../items/types/item.type';

class RecipesController {
  constructor() {}

  addRecipe(newRecipe: { name: string; itemName: string }, ingredients: Array<Item>) {
    let recipe = recipesModel.createRecipe(newRecipe.name, newRecipe.itemName, ingredients);

    eventEmitter.emit(RECIPE_CREATED, recipe);
  }
}

export let recipesController = new RecipesController();

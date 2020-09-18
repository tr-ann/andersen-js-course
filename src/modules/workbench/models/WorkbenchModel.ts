import { ERROR_CAUGHT } from '../../../constants/events';
import { eventEmitter } from '../../../events/EventEmitter';
import { isEqual } from '../../../helpers/isEqualArrays';
import { items } from '../../../storage/items.storage';
import { Item } from '../../items/types/item.type';
import { Recipe } from '../../recipes/types/recipe.type';

class WorkbenchModel {
  isCorrectRecipe(recipe: Recipe, items: Array<Item>): boolean {
    if (
      recipe &&
      isEqual(recipe.ingredients, items.map(item => item.id))
    ) {
      return true;
    }

    throw new Error('неправильный рецепт');
  }

  isCorrectIngredients(ingredients: Array<Item>): boolean {
    if (
      !ingredients.length &&
      ingredients.some(ingredient => !items.find(item => item.id == ingredient.id))
    ) {
      throw new Error('неправильные ингредиенты');
    }

    return true;
  }
}

export let workbenchModel = new WorkbenchModel();

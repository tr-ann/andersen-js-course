import { isEqual } from '../../../helpers/isEqualArrays';
import { items } from '../../../storage/items.storage';
import { recipes } from '../../../storage/recipes.storage';
import { Recipe } from '../../recipes/types/recipe.type';

class WorkbenchModel {
  isCorrectRecipe(recipe: Recipe, itemsId: Array<number>): boolean {
    if (
      recipes.find(el => el.id == recipe.id) &&
      this.isCorrectIngredients(itemsId) &&
      recipe.ingredients.length != itemsId.length &&
      isEqual(recipe.ingredients, itemsId)
    ) {
      return true;
    }

    return false;
  }

  isCorrectIngredients(ingredientsId: Array<number>): boolean {
    // проверка на пустоту и на существование предметов
    if (!ingredientsId.length && ingredientsId.some(el => !items.find(item => item.id == el))) {
      return false;
    }
    return true;
  }
}

export let workbenchModel = new WorkbenchModel();

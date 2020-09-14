import { isEqual } from '../../../helpers/isEqualArrays';
import { items } from '../../../storage/items.storage';
import { Recipe } from '../../recipes/types/recipe.type';

class WorkbenchModel {
  isCorrectRecipe(recipe: Recipe, itemsId: Array<number>): boolean {
    if (
      recipe &&
      this.isCorrectIngredients(itemsId) &&
      isEqual(recipe.ingredients, itemsId)
    ) {
      return true;
    }

    console.log('error in isCorrectRecipe')
    return false;
  }

  isCorrectIngredients(ingredientsId: Array<number>): boolean {
    if (!ingredientsId.length && ingredientsId.some(el => !items.find(item => item.id == el))) {
      console.log('error in isCorrectIngredients');

      return false;
    }

    return true;
  }
}

export let workbenchModel = new WorkbenchModel();

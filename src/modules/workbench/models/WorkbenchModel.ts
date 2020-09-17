import { isEqual } from '../../../helpers/isEqualArrays';
import { items } from '../../../storage/items.storage';
import { Item } from '../../items/types/item.type';
import { Recipe } from '../../recipes/types/recipe.type';

class WorkbenchModel {

  isCorrectRecipe(recipe: Recipe, items: Array<Item>): boolean {
    if (recipe && this.isCorrectIngredients(items) && isEqual(recipe.ingredients, items.map(item => item.id))) {
      return true;
    }

    console.log(recipe)
    console.log(recipe.ingredients);
    console.log(items.map(item => item.id));

    // thor new Error
    console.log('error in isCorrectRecipe');
    return false;
  }

  isCorrectIngredients(ingredients: Array<Item>): boolean {
    if (!ingredients.length && ingredients.some(ingredient => !items.find(item => item.id == ingredient.id))) {
      // throw new Error
      console.log('error in isCorrectIngredients');

      return false;
    }

    return true;
  }
  
}

export let workbenchModel = new WorkbenchModel();

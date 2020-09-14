import { recipes } from '../../../storage/recipes.storage';
import { itemsController } from '../../items/controllers/ItemsController';
import { recipesController } from '../../recipes/controllers/RecipesController';
import { workbenchModel } from '../models/WorkbenchModel';
import { workbenchView } from '../views/WorkbenchView';

class WorkbenchController {

  createItem(recipeId: number, itemsId: Array<number>) {
    let recipe = recipes.find(el => el.id == recipeId);

    if (workbenchModel.isCorrectRecipe(recipe, itemsId)) {
      itemsController.addItem(recipe.itemName);
    }
  }

  createRecipe(name: string = 'noname', itemName: string = 'noname', ingredients: Array<number>) {
    if (workbenchModel.isCorrectIngredients(ingredients)) {
      recipesController.addItem(name, itemName, ingredients);
    }
  }

  drawNewIngredient(ingredient: HTMLElement) {
    workbenchView.drawNewIngredient(ingredient);
  }
  
}

export let workbenchController = new WorkbenchController();

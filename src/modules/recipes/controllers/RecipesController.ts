import { recipesModel } from '../models/RecipesModel';
import { recipesView } from '../views/RecipesView';

class RecipesController {
  addItem(name: string, itemName: string, ingredients: Array<number>) {
    let recipe = recipesModel.addRecipe(name, itemName, ingredients);
    recipesView.drawNewRecipe(recipe);
  }
}

export let recipesController = new RecipesController();

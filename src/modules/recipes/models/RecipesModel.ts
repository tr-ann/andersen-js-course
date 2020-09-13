import { count } from '../../../helpers/counter';
import { recipes } from '../../../storage/recipes.storage';
import { Recipe } from '../types/recipe.type';

class RecipesModel {
  addRecipe(name: string, itemName: string, ingredients: Array<number>): Recipe {
    let recipe: Recipe = { id: count(), name, itemName, ingredients };
    recipes.push(recipe);

    return recipe;
  }
}

export let recipesModel = new RecipesModel();

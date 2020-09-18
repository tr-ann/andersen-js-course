import { count } from '../../../helpers/counter';
import { recipes } from '../../../storage/recipes.storage';
import { Item } from '../../items/types/item.type';
import { Recipe } from '../types/recipe.type';

class RecipesModel {
  createRecipe(name: string, itemName: string, ingredients: Array<Item>): Recipe {
    let ingredientsId = ingredients.map(ingredient => ingredient.id);
    let recipe: Recipe = { id: count(), name, itemName, ingredients: ingredientsId };

    recipes.push(recipe);

    return recipe;
  }

  getById(id: number) {
    return recipes.find(recipe => recipe.id == id);
  }
}

export let recipesModel = new RecipesModel();

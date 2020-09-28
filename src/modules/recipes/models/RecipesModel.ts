import { counter } from '../../../helpers/counter';
import { recipesStorage } from '../../../storage/recipes.storage';
import { Item } from '../../items/types/item.type';
import { Recipe } from '../types/recipe.type';

class RecipesModel {
  private count = counter(recipesStorage.length + 1);

  createRecipe(name: string, itemName: string, ingredients: Array<Item>): Recipe {
    let ingredientsId = ingredients.map(ingredient => ingredient.id);
    let recipe: Recipe = { id: this.count(), name, itemName, ingredients: ingredientsId };

    recipesStorage.add(recipe);

    return recipe;
  }

  getById(id: number) {
    return recipesStorage.list().find(recipe => recipe.id == id);
  }
}

export let recipesModel = new RecipesModel();

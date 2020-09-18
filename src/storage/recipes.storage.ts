import { Recipe } from '../modules/recipes/types/recipe.type';

class RecipesStorage {
  private recipes: Array<Recipe> = [
    {
      id: 1,
      name: 'recipe1',
      itemName: 'newitem1',
      ingredients: [1, 2, 3],
    },
    {
      id: 2,
      name: 'recipe2',
      itemName: 'newitem2',
      ingredients: [1, 2, 3],
    },
    {
      id: 3,
      name: 'recipe3',
      itemName: 'newitem3',
      ingredients: [1, 2, 3],
    },
  ];

  public list() {
    return this.recipes;
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  get length() {
    return this.recipes.length;
  }
}

export let recipesStorage = new RecipesStorage();

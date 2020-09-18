import { RECIPE_CREATED } from '../constants/events';
import { eventEmitter } from '../events/EventEmitter';
import { Recipe } from '../modules/recipes/types/recipe.type';

class RecipesStorage {
  private recipes: Array<Recipe> = [];

  constructor() {
    let recipesFromStorage = localStorage.getItem('recipes');

    if (recipesFromStorage) {
      this.recipes = JSON.parse(recipesFromStorage);
    } else {
      this.recipes = basicRecipes.map((value) => { return {...value} });
    }

    eventEmitter.on(RECIPE_CREATED, this.saveToLocalStorage.bind(this));
  }

  public list() {
    return this.recipes;
  }

  public add(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  get length() {
    return this.recipes.length;
  }

  private saveToLocalStorage() {
    localStorage.setItem('recipes', JSON.stringify(this.recipes).toString());
  }

}

const basicRecipes = [
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
    ingredients: [1, 2],
  },
  {
    id: 3,
    name: 'recipe3',
    itemName: 'newitem3',
    ingredients: [2, 3],
  }
]

export let recipesStorage = new RecipesStorage();

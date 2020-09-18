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
    name: 'зелье всевидящего ока',
    itemName: 'зелье всевидящего ока',
    ingredients: [1, 2, 2, 3, 3],
  },
  {
    id: 2,
    name: 'зелье легкой поступи',
    itemName: 'зелье легкой поступи',
    ingredients: [1, 2, 2, 2],
  },
  {
    id: 3,
    name: 'зелье морских туманов',
    itemName: 'зелье морских туманов',
    ingredients: [1, 3, 3, 3],
  },
  {
    id: 4,
    name: 'зелье сокрытия',
    itemName: 'зелье сокрытия',
    ingredients: [1, 4, 4, 4],
  },
  {
    id: 5,
    name: 'береговое зелье маны',
    itemName: 'береговое зелье маны',
    ingredients: [1, 5, 5],
  },
  {
    id: 6,
    name: 'береговое зелье лечения',
    itemName: 'береговое зелье лечения',
    ingredients: [1, 4, 4],
  }
]

export let recipesStorage = new RecipesStorage();

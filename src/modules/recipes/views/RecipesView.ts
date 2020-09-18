import { Cell } from '../../../common/Cell';
import { recipesStorage } from '../../../storage/recipes.storage';
import { eventEmitter } from '../../../events/EventEmitter';
import { RECIPE_CREATED } from '../../../constants/events';
import { RECIPES_LIST_ELEMENT_ID, RECIPE_ELEMENT_ID } from '../../../constants/elements.id';
import { Recipe } from '../types/recipe.type';

class RecipesView {
  constructor() {
    eventEmitter.on(RECIPE_CREATED, this.drawNewRecipe);
  }

  drawRecipesList(destination: HTMLElement) {
    const recipesBlock = document.createElement('div');

    const recipesName = document.createElement('h3');
    recipesName.textContent = 'Recipes';

    const recipesList = document.createElement('div');
    recipesList.id = RECIPES_LIST_ELEMENT_ID;
    recipesList.classList.add('container');

    recipesStorage.list().forEach(recipe => {
      let cell = Cell.createElement(`${RECIPE_ELEMENT_ID}#${recipe.id}`, recipe.name, {
        draggable: true,
      });
      recipesList.appendChild(cell);
    });

    recipesBlock.appendChild(recipesName);
    recipesBlock.appendChild(recipesList);

    destination.appendChild(recipesBlock);
  }

  drawNewRecipe(recipe: Recipe) {
    let recipesList = document.getElementById(RECIPES_LIST_ELEMENT_ID);
    let newRec = Cell.createElement(`${RECIPE_ELEMENT_ID}#${recipe.id}`, recipe.name, {draggable: true});
    recipesList.appendChild(newRec);
  }
}

export let recipesView = new RecipesView();

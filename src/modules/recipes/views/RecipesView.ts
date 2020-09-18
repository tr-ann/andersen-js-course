import { Cell } from '../../../common/Cell';
import { recipes } from '../../../storage/recipes.storage';
import { eventEmitter } from '../../../events/EventEmitter';
import { RECIPE_CREATED } from '../../../constants/events';
import { RECIPES_LIST_ELEMENT_ID, RECIPE_ELEMENT_ID, WORKBENCH_RECIPE_ELEMENT_ID } from '../../../constants/elements.id';

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

    recipes.forEach(element => {
      let cell = Cell.createElement(`${RECIPE_ELEMENT_ID}#${element.id}`, element.name, {draggable: true});
      recipesList.appendChild(cell);
    });

    recipesBlock.appendChild(recipesName);
    recipesBlock.appendChild(recipesList);

    destination.appendChild(recipesBlock);
  }

  drawNewRecipe(recipeName: string) {
    let recipeElement = document.getElementById(WORKBENCH_RECIPE_ELEMENT_ID);
    recipeElement.textContent = recipeName;
  }
}

export let recipesView = new RecipesView();

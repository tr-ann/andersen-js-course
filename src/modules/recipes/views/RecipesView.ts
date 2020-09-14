import { Recipe } from '../types/recipe.type';
import { Cell } from '../../../helpers/Cell'
import { recipes } from '../../../storage/recipes.storage';

class RecipesView {

  createRecipesList(): HTMLElement {
    // отрисовка списка рецептов
    const recipesBlock = document.createElement('div');
    // заголовок
    const recipesName = document.createElement('h3');
    recipesName.textContent = 'Recipes';

    const recipesList = document.createElement('div');
    recipesList.style.padding = '20px';
    recipesList.style.border = 'solid #00FF00 1px';

    recipes.forEach((element) => {
      let cell = new Cell(`recipe#${element.id}`, element.name);
      recipesList.appendChild(cell.createElement());
    })

    recipesBlock.appendChild(recipesName);
    recipesBlock.appendChild(recipesList);

    return recipesBlock;
  }

  drawNewRecipe(recipe: Recipe) {
    // document.get('items')
    // ...
  }
}

export let recipesView = new RecipesView();

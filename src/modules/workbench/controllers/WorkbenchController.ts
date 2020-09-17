import { eventEmitter } from '../../../events/EventEmitter';
import { INGREDIENTS_RESET, INGREDIENT_ADDED, RECIPE_ADDED } from '../../../constants/events';
import { recipes } from '../../../storage/recipes.storage';
import { itemsController } from '../../items/controllers/ItemsController';
import { itemsModel } from '../../items/models/ItemsModel';
import { Item } from '../../items/types/item.type';
import { recipesController } from '../../recipes/controllers/RecipesController';
import { Recipe } from '../../recipes/types/recipe.type';
import { workbenchModel } from '../models/WorkbenchModel';
import { recipesModel } from '../../recipes/models/RecipesModel';
import { NEW_ITEM_NAME, NEW_RECIPE_NAME } from '../../../constants/elements.id';

class WorkbenchController {

  private ingredients: Array<Item> = [];/*[
    {
    id: 1,
    name: 'item1',
    },
    {
      id: 2,
      name: 'item2',
    },
    {
      id: 3,
      name: 'item3',
    }
  ];*/
  private recipe: Recipe = null; /*{
    id: 2,
    name: 'recipe2',
    itemName: 'newitem2',
    ingredients: [1, 2, 3],
  };*/

  createItem() {
    // if (!recipe && !ingredients.length) error

    if (workbenchModel.isCorrectRecipe(this.recipe, this.ingredients)) {
      itemsController.addItem(this.recipe.itemName);
    }
  }

  createRecipe(/*name: string = 'noname', itemName: string = 'noname'*/) {
    if (workbenchModel.isCorrectIngredients(this.ingredients)) {
      let name = (<HTMLInputElement>document.getElementById(NEW_RECIPE_NAME)).value;
      let itemName = (<HTMLInputElement>document.getElementById(NEW_ITEM_NAME)).value;

      console.log({ name, itemName });

      //recipesController.addRecipe({ name, itemName }, this.ingredients);
    }
  }

  addIngredient(ingredientElementId: string, destinationElementId: string) {
    let ingredientId = Number(ingredientElementId.split('#')[1]);
    let ingredient = itemsModel.getById(ingredientId);

    this.ingredients.push(ingredient);

    eventEmitter.emit(INGREDIENT_ADDED, { itemName: ingredient.name, destinationId: destinationElementId });
  }

  addRecipe(recipeElementId: string) {
    let recipeId = Number(recipeElementId.split('#')[1]);
    let recipe = recipesModel.getById(recipeId);

    this.recipe = recipe;
    
    eventEmitter.emit(RECIPE_ADDED, recipe.name);
  }

  resetIngredients() {
    this.ingredients = [];
    this.recipe = null;

    eventEmitter.emit(INGREDIENTS_RESET, null);
  }
}

export let workbenchController = new WorkbenchController();

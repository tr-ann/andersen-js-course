import { eventEmitter } from '../../../events/EventEmitter';
import { ERROR_CAUGHT, INGREDIENTS_RESET, INGREDIENT_ADDED, RECIPE_ADDED } from '../../../constants/events';
import { itemsController } from '../../items/controllers/ItemsController';
import { itemsModel } from '../../items/models/ItemsModel';
import { Item } from '../../items/types/item.type';
import { recipesController } from '../../recipes/controllers/RecipesController';
import { Recipe } from '../../recipes/types/recipe.type';
import { workbenchModel } from '../models/WorkbenchModel';
import { recipesModel } from '../../recipes/models/RecipesModel';
import { NEW_ITEM_NAME, NEW_RECIPE_NAME } from '../../../constants/elements.id';

class WorkbenchController {
  private ingredients: Array<Item> = [];
  private recipe: Recipe = null;

  createItem() {
    try {
      if (workbenchModel.isCorrectIngredients(this.ingredients) &&
      workbenchModel.isCorrectRecipe(this.recipe, this.ingredients)
      ) {
        itemsController.addItem(this.recipe.itemName);
      }
    }
    catch (error) {
      console.log(error)
      eventEmitter.emit(ERROR_CAUGHT, error);
    }
  }

  createRecipe() {
    try {
      if (workbenchModel.isCorrectIngredients(this.ingredients)) {
        let name = (<HTMLInputElement>document.getElementById(NEW_RECIPE_NAME)).value;
        let itemName = (<HTMLInputElement>document.getElementById(NEW_ITEM_NAME)).value;
  
        recipesController.addRecipe({ name, itemName }, this.ingredients);
      }
    }
    catch (error) {
      console.log(error)
      eventEmitter.emit(ERROR_CAUGHT, error);
    }
  }

  addIngredient(ingredientElementId: string, destinationElementId: string, replaceWith?: string) {
    let ingredientId = Number(ingredientElementId.split('#')[1]);
    let ingredient = itemsModel.getById(ingredientId);

    if (replaceWith) {
      let index = this.ingredients.findIndex((item) => item.name == replaceWith);
      this.ingredients[index] = ingredient;
    }
    else {
      this.ingredients.push(ingredient);
    }

    eventEmitter.emit(INGREDIENT_ADDED, {
      itemName: ingredient.name,
      destinationId: destinationElementId,
    });
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

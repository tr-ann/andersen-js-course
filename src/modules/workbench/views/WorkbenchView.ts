import { Cell } from '../../../common/Cell';
import { workbenchController } from '../controllers/WorkbenchController';
import { eventEmitter } from '../../../events/EventEmitter';
import { INGREDIENTS_RESET, INGREDIENT_ADDED, RECIPE_ADDED } from '../../../constants/events';
import {
  INGREDIENT_ELEMENT_ID,
  ITEM_ELEMENT_ID,
  NEW_ITEM_NAME,
  NEW_RECIPE_NAME,
  RECIPE_ELEMENT_ID,
  WORKBENCH_ELEMENT_ID,
  WORKBENCH_INGREDIENTS_ELEMENT_ID,
  WORKBENCH_RECIPE_ELEMENT_ID,
} from '../../../constants/elements.id';

class WorkbenchView {
  private isCreatingRecipe = false;

  private existingRecipeBlockId = 'existing-recipe';
  private creatingRecipeBlockId = 'creating-recipe';

  constructor() {
    eventEmitter.on(INGREDIENT_ADDED, (data: any) => {
      this.drawNewIngredient(data.itemName, data.destinationId);
    });

    eventEmitter.on(RECIPE_ADDED, (recipeName: string) => {
      this.drawNewRecipe(recipeName);
    });

    eventEmitter.on(INGREDIENTS_RESET, () => {
      this.resetIngredients();
    });
  }

  drawWorkbench(destination: HTMLElement) {
    const workbenchBlock = document.createElement('div');
    workbenchBlock.id = WORKBENCH_ELEMENT_ID;
    const workbenchName = document.createElement('h3');
    workbenchName.textContent = 'Workbench';

    workbenchBlock.appendChild(workbenchName);
    workbenchBlock.appendChild(this.existingRecipeBlock());

    let newRecipeButton = document.createElement('button');
    newRecipeButton.textContent = 'new recipe';
    newRecipeButton.onclick = () => workbenchView.changeRecipeBlock();
    workbenchBlock.appendChild(newRecipeButton);

    workbenchBlock.appendChild(this.ingredientsBlock());
    workbenchBlock.appendChild(this.controlButtons());

    destination.appendChild(workbenchBlock);
  }

  private changeRecipeBlock() {
    this.isCreatingRecipe = !this.isCreatingRecipe;
    let currentRecipeBlock: HTMLElement;

    if (this.isCreatingRecipe) {
      currentRecipeBlock = document.getElementById(this.existingRecipeBlockId);
      currentRecipeBlock.replaceWith(this.creatingRecipeBlock());
    } else {
      currentRecipeBlock = document.getElementById(this.creatingRecipeBlockId);
      currentRecipeBlock.replaceWith(this.existingRecipeBlock());
    }
  }

  private creatingRecipeBlock() {
    let recipeBlock = document.createElement('div');
    recipeBlock.classList.add('container');
    recipeBlock.style.border = 'none';
    recipeBlock.id = this.creatingRecipeBlockId;

    let recipeNameDiv = document.createElement('div');
    let recipeNameLabel = document.createElement('label');
    recipeNameLabel.textContent = 'new recipe name';
    let recipeNameInput = document.createElement('input');
    recipeNameInput.id = NEW_RECIPE_NAME;

    let itemNameDiv = document.createElement('div');
    let itemNameLabel = document.createElement('label');
    itemNameLabel.textContent = 'new item name';
    let itemNameInput = document.createElement('input');
    itemNameInput.id = NEW_ITEM_NAME;

    recipeNameDiv.appendChild(recipeNameLabel);
    recipeNameDiv.appendChild(recipeNameInput);
    itemNameDiv.appendChild(itemNameLabel);
    itemNameDiv.appendChild(itemNameInput);

    recipeBlock.appendChild(recipeNameDiv);
    recipeBlock.appendChild(itemNameDiv);

    return recipeBlock;
  }

  private existingRecipeBlock() {
    let recipeBlock = document.createElement('div');
    recipeBlock.id = this.existingRecipeBlockId;

    let recipeName = document.createElement('div');
    recipeName.textContent = 'Recipe';

    let existingRecipeElement = Cell.createElement(`${WORKBENCH_RECIPE_ELEMENT_ID}`, '', {
      style: { minWidth: '50px', minHeight: '50px' },
    });
    existingRecipeElement.ondragover = this.allowDrop;
    existingRecipeElement.ondrop = this.ondrop;

    recipeBlock.appendChild(recipeName);
    recipeBlock.appendChild(existingRecipeElement);

    return recipeBlock;
  }

  private ingredientsBlock() {
    const ingredientsList = document.createElement('div');
    ingredientsList.id = WORKBENCH_INGREDIENTS_ELEMENT_ID;
    ingredientsList.classList.add('container');

    for (let i = 0; i < 6; i++) {
      let ingredientElement = Cell.createElement(`${INGREDIENT_ELEMENT_ID}#${i + 1}`, '', {
        style: { minHeight: '50px', minWidth: '50px' },
      });

      ingredientsList.appendChild(ingredientElement);
    }
    ingredientsList.ondragover = this.allowDrop;
    ingredientsList.ondrop = this.ondrop;

    return ingredientsList;
  }

  private controlButtons() {
    let buttonBlock = document.createElement('div');

    let createItemButton = document.createElement('button');
    createItemButton.textContent = 'create';
    createItemButton.onclick = () => {
      this.isCreatingRecipe ? workbenchController.createRecipe() : workbenchController.createItem();
    };

    let resetIngredientsButton = document.createElement('button');
    resetIngredientsButton.textContent = 'reset';
    resetIngredientsButton.onclick = () => workbenchController.resetIngredients();

    buttonBlock.appendChild(createItemButton);
    buttonBlock.appendChild(resetIngredientsButton);

    return buttonBlock;
  }

  drawNewIngredient(itemName: string, destinationId: string) {
    let ingredientElement = document.getElementById(destinationId);
    ingredientElement.textContent = itemName;
  }

  drawNewRecipe(recipeName: string) {
    let craftingRecipeElement = document.getElementById(WORKBENCH_RECIPE_ELEMENT_ID);
    craftingRecipeElement.textContent = recipeName;
  }

  resetIngredients() {
    for (let i = 0; i < 6; i++) {
      let ingredientElement = document.getElementById(`${INGREDIENT_ELEMENT_ID}#${i + 1}`);
      ingredientElement.textContent = '';
    }
    if (this.isCreatingRecipe) {
      (<HTMLInputElement>document.getElementById(NEW_RECIPE_NAME)).value = '';
      (<HTMLInputElement>document.getElementById(NEW_ITEM_NAME)).value = '';
    } else {
      document.getElementById(WORKBENCH_RECIPE_ELEMENT_ID).textContent = ''
    }
  }

  private ondrop(event: DragEvent) {
    event.preventDefault();
    let target = event.target as HTMLElement;
    let dragElem = event.dataTransfer.getData('text');

    if (
      dragElem.split('#')[0] == ITEM_ELEMENT_ID &&
      target.id.split('#')[0] == INGREDIENT_ELEMENT_ID
    ) {
      let replaceItemName = target.textContent ? target.textContent : '';
      workbenchController.addIngredient(dragElem, target.id, replaceItemName);
    }
    if (dragElem.split('#')[0] == RECIPE_ELEMENT_ID && target.id == WORKBENCH_RECIPE_ELEMENT_ID) {
      workbenchController.addRecipe(dragElem);
    }
  }

  private allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}

export let workbenchView = new WorkbenchView();

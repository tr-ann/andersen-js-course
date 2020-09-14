import { workbenchController } from "../modules/workbench/controllers/WorkbenchController";
import { allowDrop, drag, drop } from "./dragAndDropEvents/index";
import { EventEmitter } from "./EventEmitter";

let emitter = new EventEmitter();

emitter.on('event:create-item', (data: any) => {
  workbenchController.createItem(data.recipeId, data.itemsId);
});

emitter.on('event:create-recipe', (data: any) => {
  workbenchController.createRecipe(data.name, data.itemName, data.ingredients);
});

emitter.on('event:drag-item', (event: DragEvent) => {
  drag(event);
})

emitter.on('event:drag-over', (event: DragEvent) => {
  allowDrop(event);
})

emitter.on('event:drop', (event: DragEvent) => {
  drop(event);
})

export { emitter as eventEmitter };
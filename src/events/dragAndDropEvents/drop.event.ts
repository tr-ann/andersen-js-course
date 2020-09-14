import { Cell } from '../../helpers/Cell';
import { workbenchController } from '../../modules/workbench/controllers/WorkbenchController';

// eslint-disable-next-line import/prefer-default-export
export function drop(event: DragEvent) {
  
  console.log(event);
  event.preventDefault();
  const data = {
    id: event.dataTransfer.getData('id'),
    name: event.dataTransfer.getData('name'),
  };

  //console.log(data.id);

  const cell = new Cell(data.id, data.name);
  workbenchController.drawNewIngredient(cell.createElement());
}

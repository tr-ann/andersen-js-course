import { allowDrop, drop } from "../../../events/dragAndDropEvents/index";

class WorkbenchView {

  createWorkbench(): HTMLElement {
    // отрисовка верстака
    const workbenchBlock = document.createElement('div');
    const workbenchName = document.createElement('h3');
    workbenchName.textContent = 'Workbench';

    const workbenchDiv = document.createElement('div');
    workbenchDiv.id = 'workbench:ingredients';
    workbenchDiv.style.width = '300px';
    workbenchDiv.style.minHeight = '200px';
    workbenchDiv.style.border = 'solid 2px #000';

    workbenchDiv.ondragover = allowDrop;
    workbenchDiv.ondrop = drop;

    workbenchBlock.appendChild(workbenchName);
    workbenchBlock.appendChild(workbenchDiv);

    return workbenchBlock;
  }

  drawNewIngredient(ingredient: HTMLElement) {
    const ingredientsElement = document.getElementById('workbench:ingredients');
    ingredientsElement.appendChild(ingredient);
  }

}

export let workbenchView = new WorkbenchView();

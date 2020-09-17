export class Cell {

  static createElement(id: string, name: string, options?: any): HTMLElement {
    let cell = document.createElement('div');

    cell.classList.add('item');
    cell.setAttribute('id', id);
    cell.textContent = name;

    if (options?.draggable == true) {
      cell.draggable = true;
      cell.ondrag = ondrag;
    }

    if (options?.style) {
      let styles = Object.keys(options.style);
      for (let s of styles) {
        cell.style[s] = options.style[s];
      }
    }

    return cell;
  }

  static ondrag(event: DragEvent) {
    let target = event.target as HTMLElement;
  
    event.dataTransfer.setData('text', `crafting-${target.id}`);
  }

}

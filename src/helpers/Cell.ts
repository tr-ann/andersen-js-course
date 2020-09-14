export class Cell {

  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  createElement(options?: any): HTMLElement {
    let cell = document.createElement('span');

    cell.style.border = 'solid 1px #0000FF';
    cell.textContent = this.name;
    cell.style.padding = '10px';

    if(options?.style) {
      Object.assign(cell.style, options.style);
    }

    cell.setAttribute('id', this.id);

    return cell;
  }

}

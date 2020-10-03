export class Component {
  private _destinationElement: HTMLElement;

  constructor() {
    this._destinationElement = document.getElementById('app')
  }

  get destination() {
    return this._destinationElement;
  }
  
}

import { ERROR_ELEMENT_ID, WORKBENCH_ELEMENT_ID } from '../constants/elements.id';
import { ERROR_CAUGHT } from '../constants/events';
import { eventEmitter } from '../events/EventEmitter';

export class ErrorHandler {

  constructor() {
    eventEmitter.on(ERROR_CAUGHT, this.craftingError);
  }

  craftingError(error: Error) {
    const workbenchElement = document.getElementById(WORKBENCH_ELEMENT_ID);

    let errElem = document.getElementById(ERROR_ELEMENT_ID);
    if (errElem) {
      console.log(1);
      errElem.textContent = error.message;
    } else {
      errElem = document.createElement('div');
      errElem.id = ERROR_ELEMENT_ID;
      errElem.textContent = error.message;
      errElem.classList.add('error');
    }

    workbenchElement.appendChild(errElem);
  }

}

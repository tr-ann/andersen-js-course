class EventEmitter {
  events: any;

  constructor() {
    this.events = {};
  }

  on(eventName: string, fn: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
  }

  emit(eventName: string, data: any) {
    if (!this.events[eventName]) {
      throw new Error(`Can't emit an event. Event "${eventName}" doesn't exits.`);
    }

    this.events[eventName].forEach((callback: Function) => {
      callback(data);
    });
  }

  removeListener(name: string, listenerToRemove: any) {
    if (!this.events[name]) {
      throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
    }

    const filterListeners = (listener: any) => listener !== listenerToRemove;

    this.events[name] = this.events[name].filter(filterListeners);
  }
}

export let eventEmitter = new EventEmitter();
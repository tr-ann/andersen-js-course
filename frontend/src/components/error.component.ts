import { Component } from './basic.component'

class ErrorComponent extends Component {

  async render() {

    return `
      <section>
        <h1>Error</h1>
        <p>Error</p>
      </section>
    `
  }
}

export const errorComponent = new ErrorComponent();

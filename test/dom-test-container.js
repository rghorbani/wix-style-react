import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';

// With Jsdom we're going to add the container into the body.
export function createDOMContainer() {
  const root = document.querySelector('#root') || document.body;
  const div = document.createElement('div');
  root.appendChild(div);
  return div;
}

// A wrapper around createDOMContainer to reduce boilerplate when working with
// React components.
export class ReactDOMTestContainer {
  node;

  get componentNode() {
    return this.node.firstElementChild;
  }

  // The container is usually created outside of before() test hook, and the
  // constructor runs before any of the tests, globally. Instead of attaching
  // the DOM element upfront in the constructor and polluting the document we
  // provide this method.
  create() {
    this.node = createDOMContainer();
    return this;
  }

  destroy() {
    this.node.remove();
    return this;
  }

  // We're not returning the result of  ReactDOM.render() because its use
  // is deprecated.
  render(jsx) {
    return new Promise(resolve => ReactDOM.render(jsx, this.node, resolve));
  }

  renderSync(jsx) {
    return ReactDOM.render(jsx, this.node);
  }

  // This function's signature should be:
  // <P, T extends React.Component<P>>(jsx: React.ComponentElement<P, T>): Promise;
  // But TypeScript has this weird bug where it can derive the instance type from
  // React.createElement(Component), but cannot derive it from <Component />.
  renderWithRef(jsx) {
    const ref = React.createRef();
    jsx = React.cloneElement(jsx, { ref });
    return this.render(jsx).then(() => ref.current);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this.node);
    return this;
  }

  unmountAfterEachTest() {
    beforeAll(() => this.create());
    afterEach(() => this.unmount());
    afterAll(() => this.destroy());
    return this;
  }

  destroyAfterEachTest() {
    beforeEach(() => this.create());
    afterEach(() => (this.unmount(), this.destroy()));
    return this;
  }

  // Adapter for drivers written for wix-ui-test-utils/createDriverFactory
  createLegacyRenderer(driverFactory) {
    return jsx => {
      this.renderSync(jsx);
      return driverFactory({
        element: this.componentNode,
        wrapper: this.node,
        eventTrigger: Simulate,
      });
    };
  }
}

import {textTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

const addNewItemDriverFactory = ({wrapper, element}) => {
  return {
    exists: () => !!element,
    element: () => element,
    getText: () => textTestkitFactory({wrapper: element, dataHook: 'addnewitem-text'}).getText()
  };
};

export default addNewItemDriverFactory;

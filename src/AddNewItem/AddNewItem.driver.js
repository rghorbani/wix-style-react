import textDriverFactory from '../Text/Text.driver';

const addNewItemDriverFactory = ({wrapper, element}) => {
  const byHook = hook => element.querySelector(`[data-hook*="${hook}"]`);
  return {
    exists: () => !!element,
    element: () => element,
    getText: () => textDriverFactory({element: byHook('addnewitem-text')}).getText(),
    textExists: () => textDriverFactory({element: byHook('addnewitem-text')}).exists()
  };
};

export default addNewItemDriverFactory;

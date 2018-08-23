import textDriverFactory from '../Text/Text.driver';

const addNewItemDriverFactory = ({element, eventTrigger}) => {
  const byHook = hook => element.querySelector(`[data-hook*="${hook}"]`);
  return {
    exists: () => !!element,
    element: () => element,
    getText: () => textDriverFactory({element: byHook('additem-text')}).getText(),
    textExists: () => textDriverFactory({element: byHook('additem-text')}).exists(),
    click: () => eventTrigger.click(element)
  };
};

export default addNewItemDriverFactory;

import textDriverFactory from '../Text/Text.driver';

const addNewItemDriverFactory = ({element, eventTrigger}) => {
  const byHook = hook => element.querySelector(`[data-hook*="${hook}"]`);
  return {
    exists: () => !!element,
    element: () => element,
    getText: () => textDriverFactory({element: byHook('addnewitem-text')}).getText(),
    textExists: () => textDriverFactory({element: byHook('addnewitem-text')}).exists(),
    elipsisExists: () => !!byHook('text-with-ellipses'),
    getChildren: () => !!byHook('addnewitem-children'),
    iconExists: () => !!byHook('addnewitem-icon'),
    click: () => eventTrigger.click(element)
  };
};

export default addNewItemDriverFactory;

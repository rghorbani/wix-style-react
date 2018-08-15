const addNewItemDriverFactory = component => ({
  click: () => component.click(),
  element: () => component
});

export default addNewItemDriverFactory;

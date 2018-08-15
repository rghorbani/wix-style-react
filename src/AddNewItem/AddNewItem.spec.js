import React from 'react';
import {mount} from 'enzyme';


import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import addNewItemDriverFactory from './AddNewItem.driver';

const createDriver = createDriverFactory(addNewItemDriverFactory);

import AddNewItem from './AddNewItem';

describe('AddNewItem', () => {
  const renderAddNewItem = (props = {}) => <AddNewItem {...props}/>;

  it('should have correct displayName', () => {
    const wrapper = mount(renderAddNewItem());
    expect(wrapper.name()).toEqual('AddNewItem');
  });

  describe('`children` prop', () => {
    const text = 'Add New Item';
    it('should render text component when string is passed', () => {
      const driver = createDriver(renderAddNewItem({children: text}));
      expect(driver.getText()).toEqual(text);
    });

    it('should render passed children component when passed', () => {
      const Children = () => <div>Hello</div>;
      const driver = createDriver(renderAddNewItem({children: Children}));
      expect(driver.getChildren()).toEqual(true);
    });

    it('should not render text when children is undefined', () => {
      const driver = createDriver(renderAddNewItem());
      expect(driver.textExists()).toEqual(false);
    });
  });

  describe('`onClick` prop', () => {
    it('should call onClick when clicked', () => {
      const onClick = jest.fn();
      const driver = createDriver(renderAddNewItem({onClick}));
      driver.click();
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('`disable` prop ', () => {
    it('should not call onClick when disabled', () => {
      const onClick = jest.fn();
      const driver = createDriver(renderAddNewItem({onClick, disabled: true}));
      driver.click();
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Add icon svg', () => {
    it('should render', () => {
      const driver = createDriver(renderAddNewItem());
      expect(driver.iconExists()).toEqual(true);
    });
  });

});

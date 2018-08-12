import React from 'react';
import {mount} from 'enzyme';

import {textTestkitFactory as enzymeTextTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import addNewItemDriverFactory from './AddNewItem.driver';

const createDriver = createDriverFactory(addNewItemDriverFactory);

import AddNewItem from './AddNewItem';

describe.only('AddNewItem', () => {
  const renderAddNewItem = (props = {}) => <AddNewItem {...props}/>;

  it('should have correct displayName', () => {
    const wrapper = mount(renderAddNewItem());
    expect(wrapper.name()).toEqual('AddNewItem');
  });

  describe('`text` prop', () => {
    const text = 'Add New Item';
    it('should render text component', () => {
      const driver = createDriver(renderAddNewItem({text}));
      expect(driver.getText()).toEqual(text);
    });

    it('should not render text when `text` is undefined', () => {
      const driver = createDriver(renderAddNewItem());
      expect(driver.textExists()).toEqual(false);
    });
  });

});

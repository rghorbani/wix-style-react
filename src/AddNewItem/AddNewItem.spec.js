import React from 'react';
import {mount} from 'enzyme';

import {textTestkitFactory as enzymeTextTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import addNewItemDriverFactory from './AddNewItem.driver';

const createDriver = createDriverFactory(addNewItemDriverFactory);

import AddNewItem from './AddNewItem';

describe.only('AddNewItem', () => {
  const dataHook = 'data-hook';
  const renderAddNewItem = (props = {}) => <AddNewItem {...props} dataHook={dataHook}/>;

  it('should have correct displayName', () => {
    const wrapper = mount(renderAddNewItem());
    expect(wrapper.name()).toEqual('AddNewItem');
  });

  describe('`text` prop', () => {
    const text = 'Add New Item';
    it('when given should render Text component', () => {
      const driver = createDriver(renderAddNewItem({text}));
      expect(driver.getText()).toEqual(text);
    });
  });

});

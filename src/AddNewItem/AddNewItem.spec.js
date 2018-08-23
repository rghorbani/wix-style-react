import React from 'react';
import {mount} from 'enzyme';

import {isTestkitExists, isEnzymeTestkitExists} from '../../test/utils/testkit-sanity';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import addNewItemDriverFactory from './AddNewItem.driver';

import {addNewItemTestkitFactory} from '../../testkit';
import {addNewItemTestkitFactory as enzymeAddNewItemTestkitFactory} from '../../testkit/enzyme';

const createDriver = createDriverFactory(addNewItemDriverFactory);

import AddNewItem from './AddNewItem';

describe('AddNewItem', () => {
  const renderAddNewItem = (props = {}) => <AddNewItem {...props}/>;

  it('should have correct displayName', () => {
    const wrapper = mount(renderAddNewItem());
    expect(wrapper.name()).toEqual('WithFocusable(AddNewItem)');
  });

  describe('`children` prop', () => {
    const text = 'Add New Item';
    const child = <div data-hook="child">Hello</div>;
    it('should render text component when string is passed', () => {
      const driver = createDriver(renderAddNewItem({children: text}));
      expect(driver.getText()).toEqual(text);
    });

    it('should render children as component', () => {
      const wrapper = mount(renderAddNewItem({children: child}));
      expect(wrapper.find(`[data-hook*="child"]`).exists()).toEqual(true);
    });

    it('should not render text when children is undefined', () => {
      const driver = createDriver(renderAddNewItem());
      expect(driver.textExists()).toEqual(false);
    });


    it('should not render children as string when theme is `image`', () => {
      const driver = createDriver(renderAddNewItem({children: text, theme: 'image'}));
      expect(driver.textExists()).toEqual(false);
    });

    it('should not render children as component when theme is `image`', () => {
      const wrapper = mount(renderAddNewItem({children: child, theme: 'image'}));
      expect(wrapper.find(`[data-hook*="child"]`).exists()).toEqual(false);
    });
  });

  describe('`onClick` prop', () => {
    it('should call onClick when clicked', () => {
      const onClick = jest.fn();
      const driver = createDriver(renderAddNewItem({onClick}));
      driver.click();
      expect(onClick).toHaveBeenCalled();
    });

    it('should not call onClick when prop is undefined', () => {
      const onClick = jest.fn();
      const driver = createDriver(renderAddNewItem());
      driver.click();
      expect(onClick).not.toHaveBeenCalled();
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

  describe('Icon svg', () => {
    it('should render', () => {
      const wrapper = mount(renderAddNewItem());
      expect(wrapper.find(`[data-hook*="additem-icon"]`).exists()).toEqual(true);
    });
  });

  describe.skip('testkits', () => {
    it('should exist', () => {
      expect(isTestkitExists(renderAddNewItem(), addNewItemTestkitFactory)).toBe(true);
    });

    it('should exist for enzyme', () => {
      expect(isEnzymeTestkitExists(renderAddNewItem(), enzymeAddNewItemTestkitFactory, mount)).toBe(true);
    });
  });

});

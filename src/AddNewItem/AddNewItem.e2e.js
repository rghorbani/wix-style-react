import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from 'wix-ui-test-utils/protractor';

import {addNewItemTestkitFactory} from '../../testkit/protractor';
import {storySettings} from '../../stories/AddNewItem/storySettings';

describe('AddNewItem', () => {

  const storyUrl = createStoryUrl({kind: storySettings.kind, story: storySettings.storyName});

  const createDriverFactory = async driver => {
    await waitForVisibilityOf(driver.element(), 'Cannot find AddNewItem component');
    await scrollToElement(driver.element());
    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  beforeEach(() => {
    autoExampleDriver.reset();
  });

  describe(`'alignItems' prop`, () => {
    eyes.it(`should render with value 'center' by default`, async () => {
      await autoExampleDriver.setProps({});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with value 'left'`, async () => {
      await autoExampleDriver.setProps({alignItems: 'left'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with value 'right'`, async () => {
      await autoExampleDriver.setProps({alignItems: 'right'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });
  });

  describe(`'theme' prop`, () => {
    eyes.it(`should render with value 'dashes' by default`, async () => {
      await autoExampleDriver.setProps({});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with value 'plain'`, async () => {
      await autoExampleDriver.setProps({theme: 'plain'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with value 'filled'`, async () => {
      await autoExampleDriver.setProps({theme: 'filled'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with value 'image'`, async () => {
      await autoExampleDriver.setProps({theme: 'image'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });
  });

  describe(`'size' prop`, () => {
    eyes.it(`should render with large icon`, async () => {
      await autoExampleDriver.setProps({size: 'large'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with mediumn icon`, async () => {
      await autoExampleDriver.setProps({size: 'medium'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with small icon`, async () => {
      await autoExampleDriver.setProps({size: 'small'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with tiny icon`, async () => {
      await autoExampleDriver.setProps({size: 'tiny'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });
  });

  describe(`'disable' prop`, () => {
    eyes.it(`should render with theme dashes`, async () => {
      await autoExampleDriver.setProps({disabled: true});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with theme filled`, async () => {
      await autoExampleDriver.setProps({disabled: true, theme: 'filled'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with theme plain`, async () => {
      await autoExampleDriver.setProps({disabled: true, theme: 'plain'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });

    eyes.it(`should not apply any style with theme image`, async () => {
      await autoExampleDriver.setProps({disable: true, theme: 'image'});
      const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});
      await createDriverFactory(driver);
    });
  });
});

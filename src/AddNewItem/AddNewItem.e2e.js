import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from 'wix-ui-test-utils/protractor';

import {addNewItemTestkitFactory} from '../../testkit/protractor';
import {storySettings} from '../../stories/AddNewItem/storySettings';

describe('AddNewItem', () => {

  const storyUrl = createStoryUrl({kind: storySettings.kind, story: storySettings.storyName, withExamples: true});

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

  describe(`Breakpoints`, () => {
    eyes.it(`should render with large icon when height > 212`, async () => {
      await autoExampleDriver.setProps({});
      const driver = addNewItemTestkitFactory({dataHook: 'addItem-large'});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with large icon when height > 162`, async () => {
      await autoExampleDriver.setProps({});
      const driver = addNewItemTestkitFactory({dataHook: 'addItem-medium'});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with large icon when height > 120`, async () => {
      await autoExampleDriver.setProps({});
      const driver = addNewItemTestkitFactory({dataHook: 'addItem-small'});
      await createDriverFactory(driver);
    });

    eyes.it(`should render with large icon when height > 42`, async () => {
      await autoExampleDriver.setProps({});
      const driver = addNewItemTestkitFactory({dataHook: 'addItem-tiny'});
      await createDriverFactory(driver);
    });
  });
});

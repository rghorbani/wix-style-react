import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from 'wix-ui-test-utils/protractor';

import {addNewItemTestkitFactory} from '../../testkit/protractor';
import {storySettings} from '../../stories/AddNewItem/storySettings';

describe('AddNewItem', () => {

  const storyUrl = createStoryUrl({kind: storySettings.kind, story: storySettings.storyName, withExamples: false});

  const createDriverFactory = async () => {
    const driver = addNewItemTestkitFactory({dataHook: storySettings.dataHook});

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

  eyes.it(`should render 'alignItems' prop with value 'center' by default`, async () => {
    await autoExampleDriver.setProps({alignItems: 'center'});
    await createDriverFactory();
  });

  eyes.it(`should render 'alignItems' prop with value 'left'`, async () => {
    await autoExampleDriver.setProps({alignItems: 'left'});
    await createDriverFactory();
  });

  eyes.it(`should render 'alignItems' prop with value 'right'`, async () => {
    await autoExampleDriver.setProps({alignItems: 'right'});
    await createDriverFactory();
  });

});

import eyes from 'eyes.it';
import {createStoryUrl} from '../../test/utils/storybook-helpers';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {tagTestkitFactory} from '../../testkit/protractor';
import {tooltipTestkitFactory} from 'wix-ui-core/dist/src/testkit/protractor';

describe('Tag', () => {
  const url = createStoryUrl({kind: '12. Other', story: '12.5 Tag'});
  const tagDriver = tagTestkitFactory({dataHook: 'story-tag'});

  beforeAll(async () => {
    await browser.get(url);
  });

  afterEach(() => {
    return autoExampleDriver.remount();
  });

  ['tiny', 'small', 'medium', 'large'].forEach(size => {
    eyes.it(`should render ${size} size properly`, async () => {
      await waitForVisibilityOf(tagDriver.element(), 'Cannot find <Tag/>');
      autoExampleDriver.setProps({size});
      await eyes.checkWindow(`${size} size`);
      autoExampleDriver.setProps({removable: false});
      await eyes.checkWindow(`${size} size: without remove button`);
    });
  });

  eyes.it('should render themes', async () => {
    await waitForVisibilityOf(tagDriver.element(), 'Cannot find <Tag/>');
    autoExampleDriver.setProps({theme: 'error'});
    await eyes.checkWindow('theme: error');
    autoExampleDriver.setProps({theme: 'warning'});
    await eyes.checkWindow('theme: warning');
  });

  eyes.it('should render disabled', async () => {
    await waitForVisibilityOf(tagDriver.element(), 'Cannot find <Tag/>');
    autoExampleDriver.setProps({disabled: true});
    await eyes.checkWindow('disabled');
  });

  eyes.it('should show tooltip on hover when text is truncated with ellipses', async () => {
    const dataHook = 'story-tag';
    await autoExampleDriver.setProps({wrap: true, maxWidth: 70});
    const tagDriver = tagTestkitFactory({dataHook});
    const tooltipDriver = tooltipTestkitFactory({dataHook});
    await waitForVisibilityOf(tagDriver.element(), 'Cannot find Tag');
    expect(await tooltipDriver.isContentElementExists()).toBeFalsy();
    await tooltipDriver.mouseEnter();
    expect(await tooltipDriver.isContentElementExists()).toBeTruthy();
  });
});

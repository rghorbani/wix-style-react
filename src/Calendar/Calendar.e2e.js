import eyes from 'eyes.it';
import {calendarTestkitFactory} from '../../testkit/protractor';
import {getStoryUrl} from '../../test/utils/storybook-helpers';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

describe('Calendar', () => {
  const storyUrl = getStoryUrl('3. Inputs', '3.13 Calendar');
  const driver = calendarTestkitFactory({dataHook: 'storybook-calendar'});

  beforeAll(() => {
    browser.get(storyUrl);
  });

  beforeEach(() => {
    autoExampleDriver.reset();
  });

  describe('default', () => {

    eyes.it('should select next day date', () => {
      autoExampleDriver.setProps({value: new Date('2017/05/01')});

      driver.pressArrowRightKey();
      driver.pressEnterKey();

      expect(driver.getSelectedDate()).toBe('2017/05/02'); //??
    });
  });

  describe('with year and month dropdown', () => {
    beforeEach(() =>
      autoExampleDriver.setProps({
        showYearDropdown: true,
        showMonthDropdown: true,
        value: new Date('2017/05/01')
      })
    );

    eyes.it('should be scrolled to current year', () => {
      driver.openYearDropdownOptions();
      expect(driver.isYearInViewPort('2017')).toBeTruthy();
    });

    eyes.it('should select 2027 year', () => {
      driver.openYearDropdownOptions();
      driver.clickOnNthYear();
      driver.clickOnNthAvailableDay();

      expect(driver.getSelectedDate()).toBe('2027/05/01');
    });

    eyes.it('should select February', () => {
      driver.openMonthDropdownOptions();
      driver.clickOnNthMonth(2);
      driver.clickOnNthAvailableDay();

      expect(driver.getSelectedDate()).toBe('2017/02/01');
    });

    eyes.it('should select February and 2026 year', () => {
      driver.openYearDropdownOptions();
      driver.clickOnNthYear(2);
      driver.openMonthDropdownOptions();
      driver.clickOnNthMonth(2);
      driver.clickOnNthAvailableDay();

      expect(driver.getSelectedDate()).toBe('2026/02/01');
    });
  });
});

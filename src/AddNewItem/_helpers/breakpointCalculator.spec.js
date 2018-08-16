import {getHeightBreakpoint} from './breakpointCalculator';

describe('Breakpoint Calculator', () => {
  it('should return tiny when height is 43 ', () => {
    const height = 43;
    expect(getHeightBreakpoint(height)).toEqual('tiny');
  });

  it('should return small when height is 120', () => {
    const height = 120;
    expect(getHeightBreakpoint(height)).toEqual('small');
  });

  it('should return medium when height is 170', () => {
    const height = 170;
    expect(getHeightBreakpoint(height)).toEqual('medium');
  });

  it('should return large when height is 220', () => {
    const height = 220;
    expect(getHeightBreakpoint(height)).toEqual('large');
  });

  it('should return tiny when height is 30', () => {
    const height = 30;
    expect(getHeightBreakpoint(height)).toEqual('tiny');
  });

  it('should return large when height is over 9000', () => {
    const height = 9000;
    expect(getHeightBreakpoint(height)).toEqual('large');
  });
});

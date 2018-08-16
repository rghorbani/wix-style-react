const BREAKPOINTS = {
  large: {min: 212, max: 2000},
  medium: {min: 162, max: 212},
  small: {min: 120, max: 162},
  tiny: {min: 42, max: 120}
};


export const getHeightBreakpoint = height => {
  const results = Object.keys(BREAKPOINTS)
    .filter(breakpoint => BREAKPOINTS[breakpoint].min <= height && BREAKPOINTS[breakpoint].max > height);
  if (!results[0]) {
    height > BREAKPOINTS.large.max ? results[0] = 'large' : null;
    height < BREAKPOINTS.tiny.min ? results[0] = 'tiny' : null;
  }
  return results[0];
};


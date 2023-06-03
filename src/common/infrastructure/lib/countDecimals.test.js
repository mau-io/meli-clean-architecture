import countDecimals from './countDecimals';

describe('countDecimals', () => {
  it('should return 0 for whole numbers', () => {
    expect(countDecimals(5)).toBe(0);
    expect(countDecimals(10)).toBe(0);
    expect(countDecimals(1000)).toBe(0);
  });

  it('should return the correct number of decimal places for decimal numbers', () => {
    expect(countDecimals(3.14)).toBe(2);
    expect(countDecimals(2.71828)).toBe(5);
    expect(countDecimals(123.456789)).toBe(6);
  });

  it('should return 0 for numbers without decimal places', () => {
    expect(countDecimals(0)).toBe(0);
    expect(countDecimals(42)).toBe(0);
    expect(countDecimals(-10)).toBe(0);
  });

  it('should handle string input', () => {
    expect(countDecimals('5')).toBe(0);
    expect(countDecimals('3.14')).toBe(2);
    expect(countDecimals('-10')).toBe(0);
  });

  it('should handle NaN and non-numeric input', () => {
    expect(countDecimals(NaN)).toBe(0);
    expect(countDecimals(undefined)).toBe(0);
    expect(countDecimals('abc')).toBe(0);
  });
});
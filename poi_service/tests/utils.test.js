import { parseLocationParameter } from '../src/utils';

describe('parseLocationParameter', () => {
  const expectations = [
    { input: '@51.47552,-2.60833', output: [51.47552, -2.60833] },
  ];

  expectations.forEach((expectation) => {
    it(`parses ${expectation.input} to ${expectation.output}`, () => {
      expect(parseLocationParameter(expectation.input)).toEqual(
        expectation.output
      );
    });
  });
});

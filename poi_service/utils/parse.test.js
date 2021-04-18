const { parsePolygonParameter } = require("./parse");

describe("parsePolygonParameter()", () => {
  const expectations = [
    {
      in: "0,0,3,6,6,1",
      out: [
        [
          [0, 0],
          [6, 3],
          [1, 6],
        ],
      ],
    },
    {
      in: "1,1,3,6,6,1",
      out: [
        [
          [1, 1],
          [6, 3],
          [1, 6],
        ],
      ],
    },
    {
      in: "1.1,1.1,3.3,6.6,6.6,1.1",
      out: [
        [
          [1.1, 1.1],
          [6.6, 3.3],
          [1.1, 6.6],
        ],
      ],
    },
    {
      in: "-1.1,1.1,3.3,6.6,6.6,1.1",
      out: [
        [
          [1.1, -1.1],
          [6.6, 3.3],
          [1.1, 6.6],
        ],
      ],
    },
  ];

  expectations.forEach((expectation) => {
    it(`parses ${expectation.in} in to a GeoJSON polygon`, () => {
      expect(parsePolygonParameter(expectation.in)).toStrictEqual(
        expectation.out
      );
    });
  });
});

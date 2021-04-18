const { transform } = require("./transform");

describe("transform()", () => {
  const buildingFromDb = {
    _id: "60672a56899f0e73b60302b1",
    type: "Feature",
    properties: {
      ListEntry: 1021498,
      Name: "STABLE AT NO 10",
      Location: "Edington, Wiltshire, BA13",
      Grade: "II",
      ListDate: "1987-11-05",
      AmendDate: null,
      LegacyUID: "313808",
      NGR: "ST 93180 53436",
      CaptureSca: "1:2500",
      Hyperlink:
        "https://historicengland.org.uk/listing/the-list/list-entry/1021498",
    },
    geometry: { type: "Point", coordinates: [-2.09916, 51.28002] },
  };
  const buildingToClient = {
    id: "60672a56899f0e73b60302b1",
    properties: {
      name: "STABLE AT NO 10",
      listEntry: 1021498,
      location: "Edington, Wiltshire, BA13",
      grade: "II",
      hyperlink:
        "https://historicengland.org.uk/listing/the-list/list-entry/1021498",
    },
    geometry: {
      type: "Point",
      coordinates: [51.28002, -2.09916],
    },
  };

  it("transforms building in DB schema to comply with client contract", () => {
    expect(transform(buildingFromDb)).toStrictEqual(buildingToClient);
  });
});

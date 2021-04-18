function transform(buildingFromDb) {
  return {
    id: buildingFromDb._id,
    properties: {
      name: buildingFromDb.properties.Name,
      listEntry: buildingFromDb.properties.ListEntry,
      location: buildingFromDb.properties.Location,
      grade: buildingFromDb.properties.Grade,
      hyperlink: buildingFromDb.properties.Hyperlink,
    },
    geometry: {
      type: buildingFromDb.geometry.type,
      coordinates: [
        buildingFromDb.geometry.coordinates[1],
        buildingFromDb.geometry.coordinates[0],
      ],
    },
  };
}

module.exports = { transform };

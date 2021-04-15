const axios = require('axios');
import { POIGateway } from './POIGateway';

jest.mock('axios');

const API_URL =
  'https://l5m7m3ixeb.execute-api.eu-west-2.amazonaws.com/dev/buildings';
const empty_response = [];
const arbitrary_point = { lat: 51.4549089, lng: -2.630044 };
const formatted_arbitrary_point = '@51.4549089,-2.630044';

describe('getBuildingsNear()', () => {
  it('connects to the API', () => {
    axios.get.mockResolvedValue(empty_response);

    POIGateway.getBuildingsNear(arbitrary_point);

    expect(axios.get).toHaveBeenCalledWith(
      API_URL + '/' + formatted_arbitrary_point
    );
  });
});

describe('locationParam()', () => {
  const expectations = [
    { in: { lat: 51.4549089, lng: -2.630044 }, out: '@51.4549089,-2.630044' },
  ];

  expectations.forEach((expectation) => {
    expect(POIGateway.locationParam(expectation.in)).toEqual(expectation.out);
  });
});

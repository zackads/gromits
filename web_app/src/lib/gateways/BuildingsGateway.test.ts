import {LatLng} from "../entities/LatLng";

const axios = require('axios');
import { BuildingsGateway } from './BuildingsGateway';

jest.mock('axios');

const API_URL =
  'https://l5m7m3ixeb.execute-api.eu-west-2.amazonaws.com/dev/buildings';
const arbitrary_point: LatLng = [51.4549089, -2.630044];
const formatted_arbitrary_point = '@51.4549089,-2.630044';

describe('getBuildingsNear()', () => {
  it('connects to the API', () => {
    axios.get.mockResolvedValue([]);

    new BuildingsGateway().fetchNear(arbitrary_point)

    expect(axios.get).toHaveBeenCalledWith(
      API_URL + '/' + formatted_arbitrary_point
    );
  });
});

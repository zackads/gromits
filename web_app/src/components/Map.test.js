import { render, act, waitFor } from '@testing-library/react';
import { Map } from './Map';

describe('<Map>', () => {
  const mockPoiGateway = {
    getBuildingsNear: jest.fn().mockResolvedValue([]),
  };

  it('queries the injected poiGateway for POI markers to display', async () => {
    const centre = { lat: 51.4846117, lng: -0.0072328 };
    render(<Map poiGateway={mockPoiGateway} centre={centre} />);

    await waitFor(() => {
      expect(mockPoiGateway.getBuildingsNear).toHaveBeenCalledWith(centre);
    });
  });

  xit('displays POIs', () => {
    POIGateway.getBuildingsNear.mockResolvedValue();
  });
});

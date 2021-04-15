import { render, act, waitFor } from '@testing-library/react';
import { Map } from './Map';

describe('<Map>', () => {
  const mockPoiGateway = {
    getBuildingsNear: jest.fn().mockResolvedValue([]),
  };

  it('calls the injected fetchPOIs functions', async () => {
    render(<Map poiGateway={mockPoiGateway} />);

    await waitFor(() => {
      expect(mockPoiGateway.getBuildingsNear).toHaveBeenCalled();
    });
  });

  xit('displays POIs', () => {
    POIGateway.getBuildingsNear.mockResolvedValue();
  });
});

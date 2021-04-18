import { LoadingSpinner } from "./LoadingSpinner";
import { render, screen } from "@testing-library/react";
import { MapContainer } from "react-leaflet";
import React, { FunctionComponent } from "react";

export const TestMapContainer: FunctionComponent = ({
  children,
}): JSX.Element => {
  return (
    <MapContainer center={[0, 0]} zoom={16}>
      {children}
    </MapContainer>
  );
};

describe("LoadingSpinner component", () => {
  it("Fulfills the progressbar role", () => {
    const message = "Loading...";
    render(
      <TestMapContainer>
        <LoadingSpinner>{message}</LoadingSpinner>
      </TestMapContainer>
    );

    expect(screen.getByRole("progressbar")).toBeVisible();
  });
});

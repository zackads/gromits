import { Alert } from "./Alert";
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

describe("Alert component", () => {
  it("Renders the message", () => {
    const message = "Loading...";
    render(
      <TestMapContainer>
        <Alert>{message}</Alert>
      </TestMapContainer>
    );

    expect(screen.getByText(message)).toBeVisible();
  });
});

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
  const message = "Uh-oh! Too many buildings. Try zooming in.";

  beforeEach(() => {
    render(
      <TestMapContainer>
        <Alert>{message}</Alert>
      </TestMapContainer>
    );
  });

  it("fulfills the 'alert' accessibility role", () =>
    expect(screen.getByRole("alert")).toBeVisible());

  it("Displays the alert message", () =>
    expect(screen.getByRole("alert")).toHaveTextContent(message));
});

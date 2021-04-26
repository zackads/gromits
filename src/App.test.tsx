import { render } from "@testing-library/react";
import App from "./App";

test("renders", () => {
  const behaviour = () => render(<App />);
  expect(behaviour).not.toThrow(new Error());
});

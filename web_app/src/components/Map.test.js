test('renders', () => {
  const behaviour = () => render(<Map />);
  expect(behaviour).not.toThrow(new Error());
});

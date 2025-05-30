// __tests__/Sidebar.test.tsx
test('fetches and displays user info in sidebar', async () => {
  render(<Sidebar />);
  const userElement = await screen.findByText(/Username:/);
  expect(userElement).toBeInTheDocument();
});

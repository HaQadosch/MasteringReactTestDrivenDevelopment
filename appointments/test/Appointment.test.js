describe('Appointment', () => {
  it('should render the customer first name', () => {
    expect(document.body.textContent).toMatch('Ashley')
  });
});
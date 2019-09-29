import React from 'react'
import ReactDOM from 'react-dom'

describe('Appointment', () => {
  it('should render the customer first name', () => {
    const customer = { firstName: 'Ashley' }
    const component = <Appointment customer={ customer } />
    const container = document.createElement('div')
    document.appendChild(container)

    ReactDOM.render(component, container)

    expect(document.body.textContent).toMatch('Ashley')
  });
});
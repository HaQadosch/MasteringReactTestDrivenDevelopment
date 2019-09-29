import React from 'react'
import ReactDOM from 'react-dom'

import { Appointment } from '../src/Appointment'

describe('Appointment', () => {
  it('should render the customer first name', () => {
    const customer = { firstName: 'Ashley' }
    const container = document.createElement('div')

    ReactDOM.render(<Appointment customer={ customer } />, container)

    expect(container.textContent).toMatch('Ashley')
  });

  it('should render another customer first name', () => {
    const customer = { firstName: 'Jordan' }
    const container = document.createElement('div')

    ReactDOM.render(<Appointment customer={ customer } />, container)

    expect(container.textContent).toMatch('Jordan')
  });
});

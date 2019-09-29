import React from 'react'
import ReactDOM from 'react-dom'

import { Appointment } from '../src/Appointment'


let container
beforeEach(() => {
  container = document.createElement('div')
})

describe('Appointment', () => {
  const render = component => ReactDOM.render(component, container)

  let customer
  it('should render the customer first name', () => {
    customer = { firstName: 'Ashley' }

    render(<Appointment customer={ customer } />)

    expect(container.textContent).toMatch('Ashley')
  });

  it('should render another customer first name', () => {
    customer = { firstName: 'Jordan' }

    render(<Appointment customer={ customer } />)

    expect(container.textContent).toMatch('Jordan')
  });
});

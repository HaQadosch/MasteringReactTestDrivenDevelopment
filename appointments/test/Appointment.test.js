import React from 'react'
import ReactDOM from 'react-dom'

import { Appointment, AppointmentsDayView } from '../src/Appointment'


describe('Appointment', () => {
  let container
  beforeEach(() => {
    container = document.createElement('div')
  })
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

describe('AppointmentsDayView', () => {
  const today = new Date()
  const appointments = [
    { startsAt: today.setHours(12, 0) },
    { startsAt: today.setHours(13, 0) },
  ]
  let container
  beforeEach(() => {
    container = document.createElement('div')
  })
  const render = component => ReactDOM.render(component, container)

  it('should render a div with the right ID', () => {
    render(<AppointmentsDayView appointments={ [] } />)

    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  });

  it('should render multiple appointments', () => {
    render(<AppointmentsDayView appointments={ appointments } />)

    expect(container.querySelector('ol')).not.toBeNull()
    expect(container.querySelector('ol').children).toHaveLength(2)
  });

  it('should render each appointment in a <li />', () => {
    render(<AppointmentsDayView appointments={ appointments } />)

    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(container.querySelectorAll('li')[ 0 ].textContent).toEqual('12:00')
    expect(container.querySelectorAll('li')[ 1 ].textContent).toEqual('13:00')
  });
});

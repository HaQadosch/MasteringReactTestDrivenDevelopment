import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

import { Appointment, AppointmentsDayView } from '../src/AppointmentsDayView'

describe('Appointment', () => {
  let container
  beforeEach(() => {
    container = document.createElement('div')
  })
  const render = component => ReactDOM.render(component, container)

  let customer
  it('should render the customer first name', () => {
    customer = { firstName: 'Ashley' }

    render(<Appointment customer={customer} />)

    expect(container.textContent).toMatch('Ashley')
  })

  it('should render another customer first name', () => {
    customer = { firstName: 'Jordan' }

    render(<Appointment customer={customer} />)

    expect(container.textContent).toMatch('Jordan')
  })
})

describe('AppointmentsDayView', () => {
  const today = new Date()
  const appointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: 'Ashley' } },
    { startsAt: today.setHours(13, 0), customer: { firstName: 'Jordan' } }
  ]
  let container
  beforeEach(() => {
    container = document.createElement('div')
  })
  const render = component => ReactDOM.render(component, container)

  it('should render a div with the right ID', () => {
    render(<AppointmentsDayView appointments={[]} />)

    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull()
  })

  it('should render multiple appointments', () => {
    render(<AppointmentsDayView appointments={appointments} />)

    expect(container.querySelector('ol')).not.toBeNull()
    expect(container.querySelector('ol').children).toHaveLength(2)
  })

  it('should render each appointment in a <li />', () => {
    render(<AppointmentsDayView appointments={appointments} />)

    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(container.querySelectorAll('li')[ 0 ].textContent).toEqual('12:00')
    expect(container.querySelectorAll('li')[ 1 ].textContent).toEqual('13:00')
  })

  it('should initially show a message saying there is no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(container.textContent).toMatch('There are no appointment scheduled today.')
  })

  it('should select the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.textContent).toMatch('Ashley')
  })

  it('should have a button in each <li />', () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.querySelectorAll('li > button')).toHaveLength(2)
    expect(container.querySelectorAll('li > button')[ 0 ].type).toEqual('button')
  })

  it('should render another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />)
    const button = container.querySelectorAll('button')[ 1 ]
    ReactTestUtils.Simulate.click(button)
    expect(container.textContent).toMatch('Jordan')
  })
})

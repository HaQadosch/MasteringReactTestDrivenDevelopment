import React from 'react'
import { createContainer } from './domManipulators'
import { AppointmentForm } from '../src/AppointmentForm'
import ReactTestUtils from 'react-dom/test-utils'

describe('AppointmentForm', () => {
  let render
  let container

  beforeEach(() => {
    ({ render, container } = createContainer())
  })

  const form = id => container.querySelector(`form#${id}`)
  const getFieldWithName = name => form('appointment').elements[name]
  const labelFor = formElt => container.querySelector(`label[for="${formElt}"]`)

  it('should render a form', () => {
    render(<AppointmentForm />)
    expect(form('appointment')).not.toBeNull()
  })

  describe('service field', () => {
    const findOption = dropDownNode => {
      const options = Array.from(dropDownNode.childNodes)
      return text => options.find(({ textContent }) => textContent === text)
    }

    it('should render as a select box', () => {
      render(<AppointmentForm />)
      expect(getFieldWithName('service')).not.toBeNull()
      expect(getFieldWithName('service').tagName).toEqual('SELECT')
    })

    it('should initially have a blank value chosen', () => {
      render(<AppointmentForm />)
      const firstNode = getFieldWithName('service').childNodes[0]
      expect(firstNode.value).toEqual('')
      expect(firstNode.selected).toBeTruthy()
    })

    it('should list all the salon services', () => {
      const selectableServices = ['Cut', 'Blow-dry']
      render(<AppointmentForm selectableServices={selectableServices} />)
      const optionNodes = Array.from(getFieldWithName('service').childNodes)
      const renderServices = optionNodes.map(({ textContent }) => textContent)
      expect(renderServices).toEqual(expect.arrayContaining(selectableServices))
    })

    it('should preselect the value passed as prop', () => {
      const services = ['Cut', 'Blow-dry']
      render(<AppointmentForm selectableServices={services} service='Cut' />)
      const option = findOption(getFieldWithName('service'))('Cut')
      expect(option.selected).toBeTruthy()
    })

    it('should render a label', () => {
      render(<AppointmentForm />)
      expect(labelFor('service')).not.toBeNull()
      expect(labelFor('service').textContent).toEqual('Salon Service')
    })

    it('should assign an id that matches the label id', () => {
      render(<AppointmentForm />)
      expect(getFieldWithName('service').id).toEqual('service')
    })

    it('should save existing value when submitted', async () => {
      expect.hasAssertions()
      render(
        <AppointmentForm
          service='Cut'
          onSubmit={({ service }) => expect(service).toEqual('Cut')}
        />
      )
      await ReactTestUtils.Simulate.submit(form('appointment'))
    })

    it('should saves new value when submitted', async () => {
      expect.hasAssertions()
      render(
        <AppointmentForm
          service='Cut'
          onSubmit={({ service }) => expect(service).toEqual('Blow-dry')}
        />
      )
      await ReactTestUtils.Simulate.change(
        getFieldWithName('service'),
        {
          target: { value: 'Blow-dry', name: 'service' }
        })
      await ReactTestUtils.Simulate.submit(form('appointment'))
    })
  })

  describe('time slot table', () => {
    const table = id => container.querySelector(`table#${id}`)
    it('should render a table for time slots', () => {
      render(<AppointmentForm />)
      expect(table('time-slots')).not.toBeNull()
    })

    it('should render a time slot for every half an hour between open and close time', () => {
      render(<AppointmentForm openingTime={9} closingTime={11} />)
      const timesOfDay = table('time-slots').querySelectorAll('tbody >* th')
      expect(timesOfDay).toHaveLength(4)
      expect(timesOfDay[0].textContent).toEqual('09:00')
      expect(timesOfDay[1].textContent).toEqual('09:30')
      expect(timesOfDay[3].textContent).toEqual('10:30')
    })

    it('should render an empty cell at the start of he header row', () => {
      render(<AppointmentForm />)
      const headerRow = table('time-slots').querySelector('thead > tr')
      expect(headerRow.firstChild.textContent).toEqual('')
    })
  })
})

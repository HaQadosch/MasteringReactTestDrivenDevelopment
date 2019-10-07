import React from 'react'
import { createContainer } from './domManipulators'
import { AppointmentForm } from '../src/AppointmentForm'

describe('AppointmentForm', () => {
  let render
  let container

  beforeEach(() => {
    ({ render, container } = createContainer())
  })

  const form = id => container.querySelector(`form#${id}`)
  const getFieldWithName = name => form('appointment').elements[name]

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
  })
})

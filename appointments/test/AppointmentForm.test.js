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
    it('should render as a select box', () => {
      render(<AppointmentForm />)
      expect(getFieldWithName('service')).not.toBeNull()
      expect(getFieldWithName('service').tagName).toEqual('SELECT')
    })
  })
})

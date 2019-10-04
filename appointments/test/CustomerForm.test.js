import React from 'react'
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'

describe('CustomerForm ', () => {
  let render
  let container
  const form = id => container.querySelector(`form#${id}`)

  const expectTextField = field => {
    expect(field).not.toBeNull()
    expect(field.tagName).toEqual('INPUT')
    expect(field.type).toEqual('text')
  }

  const firstNameField = () => form('customer').elements.firstName

  const labelFor = formElt => container.querySelector(`label[for="${formElt}"]`)

  beforeEach(() => {
    ({ render, container } = createContainer())
  })

  it('should render a Form', () => {
    render(<CustomerForm />)
    expect(form('customer')).not.toBeNull()
  })

  it('should render the name field as a text box', () => {
    render(<CustomerForm />)
    expectTextField(firstNameField())
  })

  it('should include the existing value for the first name', () => {
    render(<CustomerForm firstName={'Ashley'} />)
    expect(firstNameField().value).toEqual('Ashley')
  })

  it('should render a label for the first name field', () => {
    render(<CustomerForm />)
    expect(labelFor('firstName')).not.toBeNull()
    expect(labelFor('firstName').textContent).toEqual('First Name')
  })

  it('should assign an id that matches the label id to the first name field', () => {
    render(<CustomerForm />)
    expect(firstNameField().id).toEqual('firstName')
  })
})

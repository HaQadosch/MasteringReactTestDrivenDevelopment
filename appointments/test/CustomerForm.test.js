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

  beforeEach(() => {
    ({ render, container } = createContainer())
  })

  it('should render a Form', () => {
    render(<CustomerForm />)

    expect(form('customer')).not.toBeNull()
  })

  it('should render the name field as a text box', () => {
    render(<CustomerForm />)

    const field = form('customer').elements.firstName
    expectTextField(field)
  })
})

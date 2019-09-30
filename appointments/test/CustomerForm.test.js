import React from 'react'
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'

describe('CustomerForm ', () => {
  let render
  let container
  const form = id => container.querySelector(`form#${ id }`)


  beforeEach(() => {
    ({ render, container } = createContainer())
  })

  it('should render a Form', () => {
    render(<CustomerForm />)

    expect(form('customer')).not.toBeNull()
  });
});
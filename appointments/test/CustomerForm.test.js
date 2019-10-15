import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
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

  const labelFor = formElt => container.querySelector(`label[for="${formElt}"]`)
  const selectFieldWithName = name => form('customer').elements[name]

  beforeEach(() => {
    ({ render, container } = createContainer())
  })

  it('should render a Form', () => {
    render(<CustomerForm />)
    expect(form('customer')).not.toBeNull()
  })

  const itShouldRenderAsATextBox = field => {
    it('should render as a text box', () => {
      render(<CustomerForm />)
      expectTextField(field())
    })
  }

  const itShouldIncludeTheExistingValue = (field, name) => {
    it('should include the existing value', () => {
      render(<CustomerForm {...{ [name]: 'value' }} />)
      expect(field().value).toEqual('value')
    })
  }

  const itShouldRenderALabelField = (name, textContent) => {
    it('should render a label field', () => {
      render(<CustomerForm {...{ [name]: 'value' }} />)
      expect(labelFor(name)).not.toBeNull()
      expect(labelFor(name).textContent).toEqual(textContent)
    })
  }

  const itShouldAssignAnIdThatMatchesTheLabelIdToTheField = (field, name) => {
    it('should assign an id that matches the label id to the field', () => {
      render(<CustomerForm />)
      expect(field().id).toEqual(name)
    })
  }

  const itShouldSaveTheCurrentValueWhenSubmitted = (field, name) => {
    const value = 'newValueOnChange'
    it('should save the current value when submitted', async () => {
      expect.hasAssertions()

      render(<CustomerForm {...{ [name]: 'initValue' }}
        firstName='Ashley'
        onSubmit={props => expect(props[name]).toEqual(value)}
      />)

      await ReactTestUtils.Simulate.change(field(), {
        target: { value, name }
      })
      await ReactTestUtils.Simulate.submit(form('customer'))
    })
  }

  const itSubmitsExistingValue = fieldName => {
    it('should save existing value when submitted', async () => {
      let submitArg

      render(<CustomerForm {...{ [fieldName]: 'value' }}
        onSubmit={customer => { submitArg = customer }}
      />)

      ReactTestUtils.Simulate.submit(form('customer'))
      expect(submitArg).toBeDefined()
      expect(submitArg[fieldName]).toEqual('value')
    })
  }

  describe('first name field', () => {
    const getFirstNameField = () => selectFieldWithName('firstName')

    itShouldRenderAsATextBox(getFirstNameField)
    itSubmitsExistingValue('firstName')
    itShouldIncludeTheExistingValue(getFirstNameField, 'firstName')
    itShouldRenderALabelField('firstName', 'First Name')
    itShouldAssignAnIdThatMatchesTheLabelIdToTheField(getFirstNameField, 'firstName')
    itShouldSaveTheCurrentValueWhenSubmitted(getFirstNameField, 'firstName')
  })

  describe('last name field', () => {
    const getLastNameField = () => selectFieldWithName('lastName')

    itShouldRenderAsATextBox(getLastNameField)
    itShouldIncludeTheExistingValue(getLastNameField, 'lastName')
    itShouldRenderALabelField('lastName', 'Last Name')
    itShouldAssignAnIdThatMatchesTheLabelIdToTheField(getLastNameField, 'lastName')
    itShouldSaveTheCurrentValueWhenSubmitted(getLastNameField, 'lastName')
  })

  describe('phone number field', () => {
    const getPhoneNumberField = () => selectFieldWithName('phoneNumber')

    itShouldRenderAsATextBox(getPhoneNumberField)
    itShouldIncludeTheExistingValue(getPhoneNumberField, 'phoneNumber')
    itShouldRenderALabelField('phoneNumber', 'Phone Number')
    itShouldAssignAnIdThatMatchesTheLabelIdToTheField(getPhoneNumberField, 'phoneNumber')
    itShouldSaveTheCurrentValueWhenSubmitted(getPhoneNumberField, 'phoneNumber')
  })

  it('should has a submit button', () => {
    render(<CustomerForm />)
    const submitButton = container.querySelector('input[type="submit"]')
    expect(submitButton).not.toBeNull()
  })
})

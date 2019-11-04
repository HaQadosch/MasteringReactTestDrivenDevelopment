import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'

const singleArgumentSpy = () => {
  let receivedArgument

  return {
    fn: arg => { receivedArgument = arg },
    receivedArgument: () => receivedArgument
  }
}

const spy = () => {
  let receivedArguments

  return {
    fn: (...args) => { receivedArguments = args },
    receivedArguments: () => receivedArguments,
    receivedArgument: n => receivedArguments[n]
  }
}

expect.extend({
  toHaveBeenCalled (recieved) {
    if (recieved.receivedArguments() === undefined) {
      return {
        pass: false,
        message: () => 'Spy was not called'
      }
    } else {
      return {
        pass: true,
        message: () => 'Spy was called'
      }
    }
  }
})

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
      const fetchSpy = spy()

      render(<CustomerForm {...{ [name]: 'initValue' }}
        fetch={fetchSpy.fn}
      />)

      ReactTestUtils.Simulate.change(field(), {
        target: { value, name }
      })
      ReactTestUtils.Simulate.submit(form('customer'))

      const fetchOpts = fetchSpy.receivedArgument(1)
      expect(JSON.parse(fetchOpts.body)[name]).toEqual('newValueOnChange')
    })
  }

  const itSubmitsExistingValue = fieldName => {
    it('should save existing value when submitted', async () => {
      const fetchSpy = spy()

      render(<CustomerForm {...{ [fieldName]: 'value' }}
        fetch={fetchSpy.fn}
      />)

      ReactTestUtils.Simulate.submit(form('customer'))

      const fetchOpts = fetchSpy.receivedArgument(1)
      expect(JSON.parse(fetchOpts.body)[fieldName]).toEqual('value')
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

  it('should call fetch with the right properties when submitting data', async () => {
    const fetchSpy = spy()
    render(<CustomerForm fetch={fetchSpy.fn} />)
    ReactTestUtils.Simulate.submit(form('customer'))
    expect(fetchSpy).toHaveBeenCalled()
    expect(fetchSpy.receivedArgument(0)).toEqual('/customers')

    const fetchOpts = fetchSpy.receivedArgument(1)
    expect(fetchOpts.method).toEqual('POST')
    expect(fetchOpts.credentials).toEqual('same-origin')
    expect(fetchOpts.headers).toEqual({
      'Content-type': 'application/json'
    })
  })
})

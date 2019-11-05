import React from 'react'
import ReactTestUtils, { act } from 'react-dom/test-utils'
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'

const spy = () => {
  let receivedArguments
  let returnValue

  return {
    fn: (...args) => {
      receivedArguments = args
      return returnValue
    },
    receivedArguments: () => receivedArguments,
    receivedArgument: n => receivedArguments[n],
    stubReturnValue: value => { returnValue = value }
  }
}

const fetchResponseOK = body => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(body)
})
const fetchResponseError = body => Promise.resolve({ ok: false })

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
  const originalFetch = window.fetch
  let fetchSpy

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
    fetchSpy = spy()
    window.fetch = fetchSpy.fn
    fetchSpy.stubReturnValue(fetchResponseOK({}))
  })

  afterEach(() => {
    window.fetch = originalFetch
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
      render(<CustomerForm {...{ [name]: 'initValue' }} />)

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
      render(<CustomerForm {...{ [fieldName]: 'value' }} />)

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
    render(<CustomerForm />)
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

  it('should notify onSave when form is submitted', async () => {
    const customer = ({ id: 123 })
    fetchSpy.stubReturnValue(fetchResponseOK(customer))
    const saveSpy = spy()

    render(<CustomerForm onSave={saveSpy.fn} />)

    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'))
    })

    expect(saveSpy).toHaveBeenCalled()
    expect(saveSpy.receivedArgument(0)).toEqual(customer)
  })

  it('should not notify onSave if the POST request returns an error', async () => {
    fetchSpy.stubReturnValue(fetchResponseError())
    const saveSpy = spy()

    render(<CustomerForm onSave={saveSpy.fn} />)
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'))
    })

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should prevent the default action when submitting a form', async () => {
    const preventDefaultSpy = spy()

    render(<CustomerForm />)
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'), {
        preventDefault: preventDefaultSpy.fn
      })
    })

    expect(preventDefaultSpy).toHaveBeenCalled()
  })
})

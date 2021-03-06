import React, { useState } from 'react'
import produce from 'immer'

const Error = () => <p className='error'>An error occurred during save.</p>

export const CustomerForm = ({ firstName, lastName, phoneNumber, onSave = (...args) => {} }) => {
  const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber })
  const [error, setError] = useState(false)

  const handleInputOnChange = ({ target: { name, value } }) => {
    setCustomer(customer => produce(customer, draft => { draft[name] = value }))
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    const result = await window.fetch('/customers', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    if (result.ok) {
      const customerWithId = await result.json()
      onSave(customerWithId)
    } else {
      setError(true)
    }
  }

  return (
    <form action='' id='customer' onSubmit={handleSubmit} >
      {error ? <Error /> : null}
      <label htmlFor='firstName' >First Name</label>
      <input type='text' id='firstName' name='firstName' onChange={handleInputOnChange} value={firstName} />
      <label htmlFor='lastName' >Last Name</label>
      <input type='text' id='lastName' name='lastName' onChange={handleInputOnChange} value={lastName} />
      <label htmlFor='phoneNumber' >Phone Number</label>
      <input type='text' id='phoneNumber' name='phoneNumber' onChange={handleInputOnChange} value={phoneNumber} />
      <input type='submit' value='Add' />
    </form>
  )
}

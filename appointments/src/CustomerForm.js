import React, { useState } from 'react'
import produce from 'immer'

export const CustomerForm = ({ firstName, lastName, phoneNumber, onSubmit }) => {
  const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber })

  const handleInputOnChange = ({ target: { name, value } }) => {
    setCustomer(customer => produce(customer, draft => { draft[name] = value }))
  }

  return (
    <form action='' id='customer' onSubmit={() => onSubmit(customer)}>
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

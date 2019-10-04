import React, { useState } from 'react'
import produce from 'immer'

export const CustomerForm = ({ firstName, onSubmit }) => {
  const [customer, setCustomer] = useState({ firstName })

  const handleInputOnChange = ({ target: { value } }) => {
    setCustomer(customer => produce(customer, draft => { draft.firstName = value }))
  }

  return (
    <form action='' id='customer' onSubmit={() => onSubmit(customer)}>
      <label htmlFor='firstName' >First Name</label>
      <input type='text' id='firstName' name='firstName' onChange={handleInputOnChange} value={firstName} />
    </form>
  )
}

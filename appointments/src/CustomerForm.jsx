import React from 'react'

export const CustomerForm = ({ firstName }) => (
  <form action='' id='customer'>
    <label htmlFor='firstName' >First Name</label>
    <input type='text' id='firstName' name='firstName' readOnly value={firstName} />
  </form>
)

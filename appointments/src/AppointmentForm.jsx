import React from 'react'

export const AppointmentForm = ({ selectableServices = [] }) => (
  <form id='appointment' >
    <select name='service'>
      <option />
      {selectableServices.map(s =>
        <option key={s}>{s}</option>
      )}
    </select>
  </form>
)

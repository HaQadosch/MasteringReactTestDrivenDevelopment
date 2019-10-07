import React, { useState } from 'react'

export const AppointmentForm = ({ selectableServices = [], service = '', onSubmit }) => {
  const [service_, setService_] = useState(service)

  const handleSelectChange = ({ target: { value } }) => {
    setService_(value)
  }

  return <form id='appointment' onSubmit={() => onSubmit({ service: service_ })} >
    <label htmlFor='service' >Salon Service</label>
    <select
      name='service'
      value={service_}
      onChange={handleSelectChange}
      id='service' >
      <option />
      {selectableServices.map(s =>
        <option key={s}>{s}</option>
      )}
    </select>
  </form>
}

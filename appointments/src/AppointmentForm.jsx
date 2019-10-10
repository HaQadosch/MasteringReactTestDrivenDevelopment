import React, { useState } from 'react'

const dailyTimeSlots = (open, close) => {
  const totalSlots = (close - open) * 2
  const startTime = new Date().setHours(open, 0, 0, 0)
  const incrementMS = 30 * 60 * 1000
  return Array(totalSlots)
    .fill(startTime)
    .reduce((acc, _, i) => acc.concat([startTime + (i * incrementMS)]))
}

const TimeSlotTable = () => {
  return (
    <table id='time-slots' />
  )
}

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
    <TimeSlotTable />
  </form>
}

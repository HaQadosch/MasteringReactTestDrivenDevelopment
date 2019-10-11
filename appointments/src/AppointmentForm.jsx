import React, { useState } from 'react'

const dailyTimeSlots = (openingTime, closingTime) => {
  const totalSlots = (closingTime - openingTime) * 2
  const startTime = new Date().setHours(openingTime, 0, 0, 0)
  const incrementMS = 30 * 60 * 1000
  return Array(totalSlots)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + (i * incrementMS)]))
}

// 342509340569786 => 12:32
const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5)

const TimeSlotTable = ({ openingTime, closingTime }) => {
  const timeSlots = dailyTimeSlots(openingTime, closingTime)

  return (
    <table id='time-slots' >
      <thead>
        <tr>
          <th />
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const AppointmentForm = ({ selectableServices = [], service = '', onSubmit, openingTime = 9, closingTime = 19 }) => {
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
    <TimeSlotTable openingTime={openingTime} closingTime={closingTime} />
  </form>
}

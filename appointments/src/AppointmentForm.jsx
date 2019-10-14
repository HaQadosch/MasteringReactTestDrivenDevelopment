import React, { useState } from 'react'

const timeIncrement = (numTimes, startTime, increment) => Array(numTimes)
  .fill([startTime])
  .reduce((acc, _, i) => acc.concat([startTime + (i * increment)]))

const dailyTimeSlots = (openingTime, closingTime) => {
  const totalSlots = (closingTime - openingTime) * 2
  const startTime = new Date().setHours(openingTime, 0, 0, 0)
  const incrementMS = 30 * 60 * 1000
  return timeIncrement(totalSlots, startTime, incrementMS)
}

// 342509340569786 => 12:32
const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5)

const weeklyDatesValue = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0)
  const incrementHr = 24 * 60 * 60 * 1000
  return timeIncrement(7, midnight, incrementHr)
}

const TimeSlotTable = ({ openingTime, closingTime, today = new Date() }) => {
  const timeSlots = dailyTimeSlots(openingTime, closingTime)

  const dates = weeklyDatesValue(today)
  const toShortDate = timestamp => {
    const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(' ')
    return `${day} ${dayOfMonth}`
  }

  return (
    <table id='time-slots' >
      <thead>
        <tr>
          <th />
          {dates.map(d => (
            <th key={d} >{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
            {dates.map(date => (
              <td key={date}>
                <input type='radio' name='timeslot' id='timeslot' />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const AppointmentForm = ({
  selectableServices = [],
  service = '',
  onSubmit,
  openingTime = 9,
  closingTime = 19,
  today
}) => {
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
    <TimeSlotTable openingTime={openingTime} closingTime={closingTime} today={today} />
  </form>
}

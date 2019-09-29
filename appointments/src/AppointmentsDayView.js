import React, { useState } from 'react'

export const Appointment = ({ customer: { firstName } }) => {
  return (
    <div>
      { firstName }
    </div>
  )
}

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':')
  return `${ h }:${ m }`
}
export const AppointmentsDayView = ({ appointments }) => {
  const [selectAppt, setSelectAppt] = useState(0)

  const handleApptBtnClick = index => () => {
    setSelectAppt(index)
  }

  return (
    <div id='appointmentsDayView'>
      <ol>
        { appointments.map(({ startsAt }, i) => (
          <li key={ startsAt } >
            <button type='button' onClick={ handleApptBtnClick(i) }>{ appointmentTimeOfDay(startsAt) }</button>
          </li>
        ))
        }
      </ol>
      { appointments.length === 0
        ? <p>There are no appointment scheduled today.</p>
        : <Appointment { ...appointments[selectAppt] } />
      }
    </div>
  )
}

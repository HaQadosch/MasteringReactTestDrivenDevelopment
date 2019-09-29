import React from 'react'

export const Appointment = ({ customer: { firstName } }) => {
  return (
    <div>
      { firstName }
    </div>
  )
}

const appointmentTimeOfDay = startsAt => {
  const [ h, m ] = new Date(startsAt).toTimeString().split(':')
  return `${ h }:${ m }`
}
export const AppointmentsDayView = ({ appointments }) => <div id='appointmentsDayView'>
  <ol>{ appointments.map(({ startsAt }) => <li key={ startsAt } >{
    appointmentTimeOfDay(startsAt)
  }</li>) }</ol>
</div>

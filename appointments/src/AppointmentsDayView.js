import React, { useState } from 'react'

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':')
  return `${ h }:${ m }`
}

export const Appointment = ({
  customer: { firstName, lastName, phoneNumber },
  service,
  stylist,
  notes,
  startsAt
}) => {
  return (
    <section id='appointmentView'>
      <h3>
        Today’s appointment at { appointmentTimeOfDay(startsAt) }
      </h3>
      <table>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>{ `${ firstName } ${ lastName }` }</td>
          </tr>
          <tr>
            <td>Phone number</td>
            <td>{ phoneNumber }</td>
          </tr>
          <tr>
            <td>Stylist</td>
            <td>{ stylist }</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>{ service }</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{ notes }</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export const AppointmentsDayView = ({ appointments }) => {
  const [selectAppt, setSelectAppt] = useState(0)

  const handleApptBtnClick = index => () => {
    setSelectAppt(index)
  }

  return (
    <article id='appointmentsDayView'>
      <ol>
        { appointments.map(({ startsAt }, i) => (
          <li key={ startsAt } >
            <button
              type='button'
              onClick={ handleApptBtnClick(i) }
              className={ i === selectAppt ? 'toggled' : '' }
            >{ appointmentTimeOfDay(startsAt) }</button>
          </li>
        ))
        }
      </ol>
      { appointments.length === 0
        ? <p>There are no appointments scheduled for today.</p>
        : <Appointment { ...appointments[selectAppt] } />
      }
    </article>
  )
}

import React from 'react'
import ReactDOM from 'react-dom'
import { AppointmentsDayView } from './AppointmentsDayView'
import { sampleAppointments } from './sampleData'
import { CustomerForm } from './CustomerForm'

ReactDOM.render(
  // <AppointmentsDayView appointments={sampleAppointments} />,
  <CustomerForm firstName='first' lastName='last' phoneNumber='012324' />,
  document.getElementById('root')
)

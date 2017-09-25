import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment)

const Calendar = props => (
  <div>
    <BigCalendar
      events={[]}
      defaultView="week"
      views={{ week: true }}
      defaultDate={new Date(2015, 3, 1)}
    />
  </div>
)

export default Calendar

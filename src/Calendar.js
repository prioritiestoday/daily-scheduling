import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { eventPropGetter, toCalendarEvents } from './events'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/en-gb'
import './Calendar.css'

BigCalendar.momentLocalizer(moment)

const Calendar = ({ events }) => (
  <div>
    <BigCalendar
      date={new Date(2015, 2, 2)}
      defaultView="week"
      culture="en-GB"
      eventPropGetter={eventPropGetter}
      events={toCalendarEvents(events)}
      onNavigate={() => {}}
      toolbar={false}
      views={{ week: true }}
    />
  </div>
)

export default Calendar

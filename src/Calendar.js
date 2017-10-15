import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/en-gb'
import './Calendar.css'

BigCalendar.momentLocalizer(moment)

export const Weekdays = {
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5,
  Friday: 6,
  Saturday: 7,
  Sunday: 8,
}

export const Colour = {
  Red: 'Red',
  Green: 'Green',
  Blue: 'Blue',
  Purple: 'Purple',
  Orange: 'Orange',
}

const eventPropGetter = event => ({
  className: {
    'rbc-event-red': event.colour === Colour.Red,
    'rbc-event-green': event.colour === Colour.Green,
    'rbc-event-blue': event.colour === Colour.Blue,
    'rbc-event-purple': event.colour === Colour.Purple,
    'rbc-event-orange': event.colour === Colour.Orange,
  },
})

const toCalendarEvents = events =>
  events
    .map(event => {
      const { day, hour, duration } = event.get('when').toJS()
      const start = new Date(2015, 2, day, hour)
      return event
        .delete('when')
        .set('start', start)
        .set('end', new Date(2015, 2, day, hour + duration))
    })
    .toJS()

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

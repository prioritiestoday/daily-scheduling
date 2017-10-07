import { Observable } from 'rxjs/Rx'
import { fromJS, Map } from 'immutable'
import { defaultTo, pipe } from 'ramda'
import { Weekdays } from './Calendar'

const initialCalendarData = fromJS({
  events: [
    {
      title: 'Long Event',
      when: { day: Weekdays.Monday, hour: 8, duration: 9 },
    },
    {
      title: 'Meeting',
      desc: 'Pre-meeting meeting, to prepare for the meeting',
      when: { day: Weekdays.Tuesday, hour: 12, duration: 2 },
    },
  ],
})

const dataFromLocalStorage = pipe(
  item => localStorage.getItem(item),
  defaultTo('{}'),
  JSON.parse,
  fromJS
)

export const fetchCalendarData$ = Observable.defer(() =>
  Observable.of(initialCalendarData, dataFromLocalStorage('events'))
)
  .reduce((acc, current) => acc.merge(current), Map())
  .map(data => store =>
    console.log(data.toJS()) ||
    populateEvents(
      data.get('events'),
      store.set('defaultDate', data.get('defaultDate'))
    )
  )

const populateEvents = (events, store) =>
  store.set('events', events).set('events2', events)

export const persist$ = store$ =>
  store$
    .filter(state => state.has('events'))
    .map(state => state.get('events'))
    .distinctUntilChanged((prev, current) => prev && prev.equals(current))
    .do(events => {
      localStorage.setItem('events', JSON.stringify({ events: events.toJS() }))
    })

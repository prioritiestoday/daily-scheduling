import { Observable } from 'rxjs/Rx'
import { fromJS, Map } from 'immutable'
import { defaultTo, pipe } from 'ramda'
import { Weekdays, Colour } from './events'

const initialCalendarData = fromJS({
  events: [
    {
      title: 'Development / Learning',
      when: { day: Weekdays.Saturday, hour: 20, duration: 14 },
      colour: Colour.Purple,
    },
    {
      title: 'Rest',
      when: { day: Weekdays.Friday, hour: 12, duration: 14 },
      colour: Colour.Red,
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
  .map(data => store => populateEvents(data.get('events'), store))

const populateEvents = (events, store) => store.set('events', events)

export const persist$ = store$ =>
  store$
    .filter(state => state.has('events'))
    .map(state => state.get('events'))
    .distinctUntilChanged((prev, current) => prev && prev.equals(current))
    .do(events => {
      localStorage.setItem('events', JSON.stringify({ events: events.toJS() }))
    })

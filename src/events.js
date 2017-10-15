import { get, map, merge, omit, toJS } from '@hs/transmute'
import { Map } from 'immutable'
import { converge, pipe } from 'ramda'

import { makeInterval } from './intervals'

export const Weekdays = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
}

export const Colour = {
  Red: 'Red',
  Green: 'Green',
  Blue: 'Blue',
  Purple: 'Purple',
  Orange: 'Orange',
}

export const eventPropGetter = event => ({
  className: {
    'rbc-event-red': event.colour === Colour.Red,
    'rbc-event-green': event.colour === Colour.Green,
    'rbc-event-blue': event.colour === Colour.Blue,
    'rbc-event-purple': event.colour === Colour.Purple,
    'rbc-event-orange': event.colour === Colour.Orange,
  },
})

const toEvent = converge(merge, [
  omit(['when']),
  pipe(get('when'), toJS, makeInterval, Map),
])

export const toCalendarEvents = pipe(map(toEvent), toJS)

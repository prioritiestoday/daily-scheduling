import { addDays, addHours } from 'date-fns/esm/fp'
import { pipe } from 'ramda'

const initialDate = new Date(2015, 2, 2)

export const makeInterval = ({ day, hour, duration }) => ({
  start: pipe(addDays(day), addHours(hour))(initialDate),
  end: pipe(addDays(day), addHours(hour + duration))(initialDate),
})

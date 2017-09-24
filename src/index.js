import React from 'react'
import ReactDOM from 'react-dom'
import { Observable } from 'rxjs/Rx'
import { fromJS, Map } from 'immutable'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const initialCalendarData = fromJS({
  events: [],
})

const calendarData$ = Observable.concat(
  Observable.of(initialCalendarData),
  Observable.defer(() => {
    const events = localStorage.getItem('events')
    return events
      ? Observable.of(fromJS({ events: JSON.parse(events) }))
      : Observable.empty()
  })
).map(data => store => store.set('events', data.get('events')))

const store$ = Observable.merge(calendarData$)
  .scan((state, reduceOperation) => reduceOperation(state), Map())
  .distinctUntilChanged((prev, current) => prev.equals(current))

store$
  .do(store => {
    ReactDOM.render(<App store={store} />, document.getElementById('root'))
  })
  .subscribe(state => console.log('Updated state', state.toString()))

store$
  .filter(state => state.has('events'))
  .map(state => state.get('events'))
  .distinctUntilChanged((prev, current) => prev && prev.equals(current))
  .subscribe(events => {
    localStorage.setItem('events', JSON.stringify(events.toJS()))
  })

registerServiceWorker()

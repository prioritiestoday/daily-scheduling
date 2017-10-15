import React from 'react'
import ReactDOM from 'react-dom'
import { Observable } from 'rxjs/Rx'
import { Map } from 'immutable'

import './index.css'
import App from './App'
import { fetchCalendarData$, persist$ } from './data'
import registerServiceWorker from './registerServiceWorker'

const store$ = Observable.merge(fetchCalendarData$)
  .scan((state, reduceOperation) => reduceOperation(state), Map())
  .distinctUntilChanged((prev, current) => prev.equals(current))
  .publishReplay(1)
  .refCount()

store$
  .do(store => {
    ReactDOM.render(<App store={store} />, document.getElementById('root'))
  })
  .subscribe(state => console.log('Updated state', state.toJS()))

store$
  .let(persist$)
  .subscribe(events => console.log('Persisted events', events.toJS()))

registerServiceWorker()

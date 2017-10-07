import React, { Component } from 'react'
import { List } from 'immutable'
import Calendar from './Calendar'
import './App.css'

class App extends Component {
  render() {
    const store = this.props.store

    return (
      <div className="app">
        <header className="header">
          <h2 className="header-title">Daily Scheduling</h2>
        </header>
        <main className="main">
          <Calendar events={store.get('events', List())} />
        </main>
        <footer className="footer">
          <span>Footer content</span>
        </footer>
      </div>
    )
  }
}

export default App

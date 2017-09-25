import React, { Component } from 'react'
import Calendar from './Calendar'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h2>Daily Scheduling</h2>
        </header>
        <main className="main">
          <Calendar />
        </main>
        <footer className="footer">
          <span>Footer content</span>
        </footer>
      </div>
    )
  }
}

export default App

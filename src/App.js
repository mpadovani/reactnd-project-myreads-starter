import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks />
        )}/>
      </div>
    )
  }
}

export default App

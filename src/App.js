import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks />
        )}/>
        <Route path='/search' render={({ history }) => (
            <SearchBooks
              onCreateContact={(contact) => {
                this.createContact(contact)
                history.push('/')
              }}
            />
        )}/>
      </div>
    )
  }
}

export default App

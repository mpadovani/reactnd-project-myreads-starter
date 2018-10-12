import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'

class App extends Component {
  state = {
    books: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()

    this.setState({ books })
  }

  onChangeShelf = (book, shelf) => {
    // var foundIndex = this.state.books.findIndex(x => x.id === book.id)
    // this.state.books[foundIndex].shelf = shelf
    //
    // this.setState((state) => ({
    //   books: state.books
    // }))


    console.log(book);
    console.log(shelf);
    //BooksAPI.update(book, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            onChangeShelf={this.onChangeShelf}
            books={this.state.books}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
            <SearchBooks
              onChangeShelf={this.onChangeShelf}
            />
        )}/>
      </div>
    )
  }
}

export default App

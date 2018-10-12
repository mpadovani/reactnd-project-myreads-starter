import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import { unionWith, eqBy, prop } from 'ramda'

class App extends Component {
  state = {
    myBooks: []
  }

  async componentDidMount() {
    const myBooks = await BooksAPI.getAll()

    this.setState({ myBooks })
  }

  onChangeShelf = (book, shelf) => {
    book.shelf = shelf

    if (shelf === "none") {
      this.removeBook(book)
      return
    }

    const found = this.state.myBooks.some(function (myBook) {
      return myBook.id === book.id;
    });

    (!found) ? this.addBook(book) : this.updateBookShelf(book)

    BooksAPI.update(book, shelf);
  }

  updateBookShelf = (book) => {
    this.setState((state) => ({
      books: unionWith(eqBy(prop('id')), book, state.myBooks)
    }))
  }

  addBook = (book) => {
    this.setState(state => ({
      myBooks: state.myBooks.concat([ book ])
    }))

  }

  removeBook = (book) => {
    this.setState((state) => ({
      myBooks: state.myBooks.filter((myBook) => myBook.id !== book.id)
    }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            onChangeShelf={this.onChangeShelf}
            myBooks={this.state.myBooks}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
            <SearchBooks
              onChangeShelf={this.onChangeShelf}
              myBooks={this.state.myBooks}
            />
        )}/>
      </div>
    )
  }
}

export default App

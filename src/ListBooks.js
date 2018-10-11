import React, { Component } from 'react';
import BooksGrid from './BooksGrid'
import * as BooksAPI from './utils/BooksAPI'

class ListBooks extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onChangeShelf = (book, shelf) => {
    var foundIndex = this.state.books.findIndex(x => x.id === book.id)
    this.state.books[foundIndex].shelf = shelf

    this.setState((state) => ({
      books: state.books
    }))

    BooksAPI.update(book, shelf);
  }

  render() {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <BooksGrid books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
                         onChangeShelf={this.onChangeShelf}/>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BooksGrid books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                         onChangeShelf={this.onChangeShelf}/>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BooksGrid books={this.state.books.filter((book) => book.shelf === "read")}
                         onChangeShelf={this.onChangeShelf}/>
            </div>
          </div>

          <div className="open-search">
            <a>Add a book</a>
          </div>
        </div>
    )
  }
}

export default ListBooks

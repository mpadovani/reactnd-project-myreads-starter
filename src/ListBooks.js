import React, { Component } from 'react';
import BooksGrid from './BooksGrid'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { onChangeShelf, books } = this.props

    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <BooksGrid books={books.filter((book) => book.shelf === "currentlyReading")}
                         onChangeShelf={onChangeShelf}/>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BooksGrid books={books.filter((book) => book.shelf === "wantToRead")}
                         onChangeShelf={onChangeShelf}/>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BooksGrid books={books.filter((book) => book.shelf === "read")}
                         onChangeShelf={onChangeShelf}/>
            </div>
          </div>

          <div className="open-search">
            <Link to='/search'>Add Book</Link>
          </div>
        </div>
    )
  }
}

export default ListBooks

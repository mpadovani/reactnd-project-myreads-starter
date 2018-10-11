import React, { Component } from 'react';
import BooksGrid from './BooksGrid'
import * as BooksAPI from './utils/BooksAPI'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    if (query.length > 2) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          this.setState({ books: [] })
          return
        }
        console.log(books)
        this.setState({ books: books })
      }).catch(function(error){
        console.log(error);
      });
    }
  }

  showBooks = () => {
    if (this.state.books.length > 0) {
      return
    }
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
    const { query } = this.state.query

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
        <BooksGrid books={this.state.books} onChangeShelf={this.onChangeShelf}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks

import React, { Component } from 'react';
import BooksGrid from './BooksGrid'
import * as BooksAPI from './utils/BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';

class SearchBooks extends Component {
  state = {
    books: [],
    query: '',
  }

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    if (query.length == 0) {
      this.setState({ books: [] })
      return
    }

    BooksAPI.search(query).then((books) => {
      if (books.error) {
        this.setState({ books: [] })
        return
      }

      this.setState({ books: books })
    }).catch(function(error){
      console.log(error);
    });
  }

  render() {
    const { query } = this.state.query
    const { onChangeShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="500" handler="onChange">
              <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
          </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={this.state.books} onChangeShelf={onChangeShelf}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks

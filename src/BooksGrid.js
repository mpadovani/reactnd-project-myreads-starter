import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { unionWith, eqBy, prop } from 'ramda';

class BooksGrid extends PureComponent {
  state = {
    books: this.props.books
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  showStyle = (book) => {
    if (!book.imageLinks) {
      return { 'width': 128, 'height': 193 }
    }

    return { 'width': 128, 'height': 193, 'backgroundImage': `url(${book.imageLinks.thumbnail})` }
  }

  onChangeShelf = (book, shelf) => {
    book.shelf = shelf;


    this.setState((state) => ({
      books: unionWith(eqBy(prop('id')), book, state.books)
    }))

    this.props.onChangeShelf(book, shelf);
  }

  render() {
    return (
      <ol className="books-grid">
         {this.props.books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover"
                        style={this.showStyle(book)}>
                    </div>
                  <div className="book-shelf-changer">
                    <select key={book.id} onChange={(e) => this.onChangeShelf(book, e.target.value)}
                      value={(book.shelf) ? book.shelf : 'none'}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{(book.authors) ? book.authors.join(', ') : 'N/A'}</div>
              </div>
            </li>
          ))}
      </ol>
    )
  }
}

export default BooksGrid

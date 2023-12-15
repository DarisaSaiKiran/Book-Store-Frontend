import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';

class AdminBookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentPage: 1,
      booksPerPage: 5,
    };
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    axios.get('http://localhost:8081/book/all').then((response) => response.data).then((data) => {
      this.setState({ books: data });
    });
  }

  deleteBook = (bookId) => {
    axios.delete(`http://localhost:8081/book/${bookId}`).then((response) => {
      if (response.data != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.setState({
          books: this.state.books.filter((book) => book.id !== bookId),
        });
      } else {
        this.setState({ show: false });
      }
    });
  };

  render() {
    const { books } = this.state;

    // Sort books array to display featured books first
    const sortedBooks = [...books].sort((a, b) => (b.featured ? 1 : a.featured ? -1 : 0));

    return (
      <div className="bgad">
        <div>
          <div style={{ display: this.state.show ? 'block' : 'none' }}>
            <MyToast show={this.state.show} message={'Book Deleted Successfully.'} type={'danger'} />
          </div>
          <AdminDashboard />
          <Card className="p-3 mb-2 bg-white text-white" style={{ margin: '0 20px' }}>
            <Card.Header className="p-3 mb-2 bg-primary text-white">
              <FontAwesomeIcon icon={faList} />
              Book List
            </Card.Header>
            <Card.Body>
              {sortedBooks.length === 0 ? (
                <div align="center">No Books Available</div>
              ) : (
                <div className="d-flex flex-wrap">
                  {sortedBooks.map((book) => (
                    <Card key={book.id} style={{ width: '11rem', margin: '10px', position: 'relative' }}>
                      <Card.Img variant="top" src={book.imageUrl} className="img-fluid" style={{ width: '100%', height: '10rem' }} />
                      {book.featured && <div className="featured-label">Featured</div>}
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                      </Card.Body>

                      <div className='card-footer text-center fw-bold'>By {book.author}</div>
                      <div className="card-footer text-center">Price: Rs. {book.price}</div>
                      <Card.Footer>
                        <Link to={`/edit/${book.id}`} className="btn btn-sm btn-outline-primary">
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </Link>{' '}
                        <Button size="sm" variant="outline-danger" onClick={() => this.deleteBook(book.id)}>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </Button>
                      </Card.Footer>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default AdminBookList;

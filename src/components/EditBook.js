import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import UserDashboard from './UserDashboard';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const initialState = {
    title: '',
    author: '',
    imageUrl: '',
    price: '',
    featured: false,
  };

  const [book, setBook] = useState(initialState);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate(); // Access the navigate function
  const { id } = useParams();

  useEffect(() => {
    fetchBookDetails(id);
  }, [id]);

  const resetBook = () => {
    setBook(initialState);
  };

  const fetchBookDetails = (id) => {
    axios
      .get(`http://localhost:8081/book/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  };

  const submitBook = (event) => {
    event.preventDefault();
    console.log('handle request ');

    axios
      .put(`http://localhost:8081/book/update/${id}`, book)
      .then((response) => {
        if (response.data != null) {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);

          // Navigate to "/getall" after successful book edit
          navigate('/getall');
        } else {
          setShowToast(false);
        }
      });

    setBook(initialState);
  };

  const bookChange = (event) => {
    const { name, value, type, checked } = event.target;
    setBook((prevBook) => {
      return name === 'featured'
        ? {
            ...prevBook,
            featured: checked,
          }
        : {
            ...prevBook,
            [name]: type === 'checkbox' ? checked : value,
          };
    });
  };

  const { title, author, imageUrl, price, featured } = book;

  return (
    <div className="bgad">
      <div>
        <div style={{ display: showToast ? 'block' : 'none' }}>
          <MyToast show={showToast} message={'Book Saved Successfully.'} type={'success'} />
        </div>
        <UserDashboard />
        <Container>
          <br />
          <br />
          <Card className="mx-auto" style={{ width: '50rem' }}>
            <CardHeader className="p-3 mb-2 bg-primary text-white">
              <FontAwesomeIcon icon={faPlusSquare} />
              Edit Book
            </CardHeader>
            <form onReset={resetBook} onSubmit={submitBook} id="centerFormId">
              <Card.Body>
                <div className="form-group">
                  <label htmlFor="exampleInputTitle1"> Title </label>
                  <input
                    controlId="formGridTitle"
                    value={title}
                    onChange={bookChange}
                    type="title"
                    name="title"
                    className="form-control"
                    required
                    autoComplete="off"
                    id="exampleInputTitle1"
                    placeholder="Title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputAuthor1">Author</label>
                  <input
                    controlId="formGridAuthor"
                    value={author}
                    onChange={bookChange}
                    type="author"
                    name="author"
                    className="form-control"
                    required
                    autoComplete="off"
                    id="exampleInputAuthor1"
                    placeholder="Author"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputImageUrl1">Image Url</label>
                  <input
                    controlId="formGridImageUrl"
                    value={imageUrl}
                    onChange={bookChange}
                    type="imageUrl"
                    name="imageUrl"
                    className="form-control"
                    required
                    autoComplete="off"
                    id="exampleInputImageUrl1"
                    placeholder="ImageURL"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPrice1">Price</label>
                  <input
                    controlId="formGridPrice"
                    value={price}
                    onChange={bookChange}
                    type="price"
                    name="price"
                    className="form-control"
                    required
                    autoComplete="off"
                    id="exampleInputPrice"
                    placeholder="Price"
                  />
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleInputFeatured"
                    name="featured"
                    checked={featured}
                    onChange={bookChange}
                  />
                  <label className="form-check-label" htmlFor="check1">
                    Featured
                  </label>
                </div>
              </Card.Body>
              <Card.Footer style={{ textAlign: 'right' }}>
                <button size="sm" variant="dark" type="submit" className="btn btn-dark">
                  <FontAwesomeIcon icon={faSave} />Update
                </button>{' '}
                <button size="sm" className="btn btn-warning" type="button" onClick={() => navigate(-1)}>
                  <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>
              </Card.Footer>
            </form>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default EditBook;

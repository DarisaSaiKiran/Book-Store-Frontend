import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import MyToast from './MyToast';
import UserDashboard from './UserDashboard';

const AddBook = () => {
  const [state, setState] = useState({
    title: '',
    author: '',
    imageUrl: '',
    price: '',
    featured: false, // default value for checkbox
    show: false,
  });

  const navigate = useNavigate(); // Access the navigate function

  const resetBook = () => {
    setState({
      title: '',
      author: '',
      imageUrl: '',
      price: '',
      featured: false,
    });
  };
  const handleCancel = (event) => {
    event.preventDefault(); 
    navigate(-1);
  };
  

  const submitBook = event => {
    event.preventDefault();
    console.log('handle request ');

    const book = {
      title: state.title,
      author: state.author,
      imageUrl: state.imageUrl,
      price: state.price,
      featured: state.featured,
    };

    axios.post('http://localhost:8081/book/addbook', book)
      .then(response => {
        if (response.data != null) {
          setState({ ...state, show: true });
          setTimeout(() => setState({ ...state, show: false }), 3000);

          // Navigate to "/getall" after successful book addition
          navigate('/getall');
        } else {
          setState({ ...state, show: false });
        }
      });

    resetBook();
  };

  const bookChange = event => {
    const { name, value, type, checked } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const { title, author, imageUrl, price, featured } = state;

  return (
    <div className='bgad'>
      <div>
        <div style={{ display: state.show ? 'block' : 'none' }}>
          <MyToast show={state.show} message={"Book Saved Successfully."} type={"success"} />
        </div>
        <UserDashboard />
        <Container>
          <br></br>
          <br></br>
          <Card className='mx-auto' style={{ width: '50rem' }}>
            <CardHeader className="p-3 mb-2 bg-primary text-white">
              <FontAwesomeIcon icon={faPlusSquare} />Book Detail
            </CardHeader>
            <form onReset={resetBook} onSubmit={submitBook} id="centerFormId">
              <Card.Body>
                <div className="form-group">
                  <label htmlFor="exampleInputTitle1"> Title </label>
                  <input
                    controlid="formGridTitle"
                    value={title}
                    onChange={bookChange}
                    type="title"
                    name="title"
                    className="form-control"
                    required
                    autoComplete='off'
                    id="exampleInputTitle1"
                    placeholder="Title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputAuthor1">Author</label>
                  <input
                    controlid="formGridAuthor"
                    value={author}
                    onChange={bookChange}
                    type="author"
                    name="author"
                    className="form-control"
                    required
                    autoComplete='off'
                    id="exampleInputAuthor1"
                    placeholder="Author"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputImageUrl1">Image Url</label>
                  <input
                    controlid="formGridImageUrl"
                    value={imageUrl}
                    onChange={bookChange}
                    type="imageUrl"
                    name="imageUrl"
                    className="form-control"
                    // required
                    autoComplete='off'
                    id="exampleInputImageUrl1"
                    placeholder="ImageURL"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPrice1">Price</label>
                  <input
                    controlid="formGridPrice"
                    value={price}
                    onChange={bookChange}
                    type="number"
                    name="price"
                    className="form-control"
                    required
                    autoComplete='off'
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
                  <label className="form-check-label" htmlFor="check1">Featured</label>
                </div>
              </Card.Body>
              <Card.Footer style={{ textAlign: 'right' }}>
                <button size="sm" variant="dark" type="submit" className="btn btn-dark">
                  <FontAwesomeIcon icon={faSave} />Submit
                </button>{' '}
                <button size="sm"  variant="warning" type="reset" className="btn btn-warning">
                  <FontAwesomeIcon icon={faUndo} /> Reset
                </button>{' '}
                <button size="sm" variant="warning" onClick={handleCancel} type="cancel" className="btn btn-warning">
                  <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>{' '}
              </Card.Footer>
            </form>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AddBook;

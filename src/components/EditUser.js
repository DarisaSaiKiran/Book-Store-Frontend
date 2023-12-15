import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faSave, faTimes,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import UserDashboard from './UserDashboard';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const initialState = {
    username: '',
    password: '',
    profileImageUrl: '',
    email: '',
  };
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [user, setUser] = useState(initialState);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate(); // Access the navigate function
  const { id } = useParams();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const resetUser = () => {
    setUser(initialState);
  };

  const fetchUserDetails = () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userinfo'));
      const userEmail = userInfo.email;

      axios
        .get(`http://localhost:8082/user/email/${userEmail}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const submitUser = (event) => {
    event.preventDefault();
    console.log('handle request ');

    axios
      .put(`http://localhost:8082/user/updateByEmail/${user.email}`, user)
      .then((response) => {
        if (response.data != null) {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
            alert("User Details updated");
          navigate(-1);
        } else {
          setShowToast(false);
        }
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
      });

    setUser(initialState);
  };

  const userChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const { username, password, profileImageUrl, email } = user;

  return (
    <div className="bgad">
      <div>
        <MyToast show={showToast} message={'User Details Saved Successfully.'} type={'success'} />
        <UserDashboard />
        <Container>
          <br />
          <br />
          <Card className="mx-auto" style={{ width: '50rem' }}>
            <CardHeader className="p-3 mb-2 bg-primary text-white">
              <FontAwesomeIcon icon={faUserEdit} />
              Edit User
            </CardHeader>
            <form onReset={resetUser} onSubmit={submitUser} id="centerFormId">
              <Card.Body>
                <div className="form-group">
                  <label htmlFor="exampleInputUsername">Username</label>
                  <input
                    controlId="formGridUsername"
                    value={username}
                    onChange={userChange}
                    type="text"
                    name="username"
                    className="form-control"
                    required
                    autoComplete="off"
                    id="exampleInputUsername"
                    placeholder="Username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword">Password</label>
                  <div className="input-group">
                    <input
                      controlId="formGridPassword"
                      value={password}
                      onChange={userChange}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="form-control"
                      required
                      autoComplete="off"
                      id="exampleInputPassword"
                      placeholder="Password"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text p-2" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputProfileImageUrl">Profile Image URL</label>
                  <input
                    controlId="formGridProfileImageUrl"
                    value={profileImageUrl}
                    onChange={userChange}
                    type="text"
                    name="profileImageUrl"
                    className="form-control"
                    required
                    autoComplete="off"
                    id="exampleInputProfileImageUrl"
                    placeholder="Profile Image URL"
                  />
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

export default EditUser;

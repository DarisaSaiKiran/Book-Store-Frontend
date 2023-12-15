import React, { useState } from 'react';
import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave ,faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Dashboard from './Dashboard';

import MyToast from './MyToast';
import { Link, useNavigate } from 'react-router-dom';

const User = () => {
  const initialState = {
    username: '',
    password: '',
    email: '',
    profileImageUrl: '',
  };
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [user, setUser] = useState(initialState);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const resetUser = () => {
    setUser(initialState);
  };

  const submitUser = (event) => {
    event.preventDefault();
    console.log('handle request ');

    axios
      .post('http://localhost:8082/user/register', user)
      .then((response) => {
        if (response.data != null) {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        } else {
          setShowToast(false);
        }
      });

    setUser(initialState);
  };

  const userChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const { username, password, email, profileImageUrl } = user;

  return (
    <>
      <Dashboard />
      <div className="bgad">
        <div md={8} lg={6} xs={12}>
          <div style={{ display: showToast ? 'block' : 'none' }}>
            <MyToast show={showToast} message={'User Saved Successfully.'} type={'success'} />
          </div>

          <br></br>

          <Card className="mx-auto" style={{ width: '30rem' }}>
            <CardHeader className="p-2 mb-2 bg-info text-white">
              <FontAwesomeIcon icon={faPlusSquare} />Register Here!
            </CardHeader>

            <form onReset={resetUser} onSubmit={submitUser} id="userFormId">
              <Card.Body>
                <Row>
                  <div className="form-group">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input
                      controlid="formGridUsername"
                      value={username}
                      onChange={userChange}
                      type="username"
                      name="username"
                      className="form-control"
                      required
                      autoComplete="off"
                      id="exampleInputUsername1"
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
                      <Button className="input-group-text p-2" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                      </Button>
                    </div>
                  </div>
                </div>
                </Row>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    controlid="formGridEmail"
                    value={email}
                    onChange={userChange}
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    autoComplete="off"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                  />
                </div>

                <div className="form-group">
          <label htmlFor="exampleInputProfileImageUrl1">Image Url</label>
          <input
            controlid="formGridProfileImageUrl"
            value={profileImageUrl}
            onChange={userChange}
            type="profileImageUrl"
            name="profileImageUrl"
            className="form-control"
            // required
            autoComplete="off"
            id="exampleInputProfileImageUrl1"
            placeholder="ProfileImageUrl"
          />
        </div>
              </Card.Body>
              <Card.Footer style={{ textAlign: 'center' }}>
                <button size="sm" variant="dark" type="submit" className="btn  btn-dark">
                  <FontAwesomeIcon icon={faSave} />
                  Submit
                </button>
              </Card.Footer>
              <div className="mt-3">
                <p className="text-primary text-center">
                  Already Registered? Click Here!!!{' '}
                  <Link to={'/login'} className="text-primary fw-bold">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default User;

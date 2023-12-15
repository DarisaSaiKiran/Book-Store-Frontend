import React, { useState } from 'react';
import { Form, Card, InputGroup, Row, Col, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faEnvelope, faLock,faEyeSlash,faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handlesignup = () => {
    navigate('/register')
  }

  const userinfo = { id }

  const handleApi = (e) => {
    console.log({ email, password });
    axios
      .post(
        "http://localhost:8082/user/login",
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((result) => {
        console.log(result);
        if (result.data !== 0) {
          // Store the logged-in user's information in localStorage
          localStorage.setItem("userinfo", JSON.stringify({ id: result.data, email: email, username: result.data.username }));
          console.log(localStorage);
          navigate('/dash');
        } else {
          alert("Login failed. Please check your email and password.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className='bgad'>
        <Dashboard />
        <Row className="justify-content-md-center">
          <Col xs={4}>
            <br></br>
            <br></br>
            <Card className={"border border-dark bg-dark text-white"}>
              <Card.Header>
                <FontAwesomeIcon icon={faSignInAlt} />Login
              </Card.Header>
              <Card.Body>
                <Row>
                  <Form.Group as={Col} >{'  '}
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                      <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={handleEmail}
                        className={"bg-info text-white"} placeholder="Enter Email address" />
                    </InputGroup>
                  </Form.Group >
                </Row>
                <br></br>
                <Row>
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                      <FormControl required autoComplete="off" type={showPassword ? "text" : "password"} name="password" value={password} onChange={handlePassword}
                        className={"bg-info text-white"} placeholder="Enter Password" />
                      <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />                      </Button>
                    </InputGroup>
                  </Form.Group>
                </Row>
              </Card.Body>
              <Card.Footer style={{ "textAlign": "left" }}>
                <Button size="sm" type="button" variant="success" onClick={handleApi}>
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Button>{' '}
                <Button size="sm" type="button" variant="success" onClick={handlesignup}>
                  <FontAwesomeIcon icon={faUserPlus} /> Signup
                </Button>{' '}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Login;

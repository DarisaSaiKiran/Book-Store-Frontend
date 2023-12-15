import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';

function UserDashboard() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate('/'); 
  };

  const userInfo = JSON.parse(localStorage.getItem('userinfo'));
  const email = userInfo ? userInfo.email : null;
  const formattedUsername = email ? email.charAt(0).toUpperCase() + email.slice(1).toLowerCase() : null;

  return (
    <Navbar bg="dark" variant="dark">
      <Link to={"/"} className="navbar-brand">
        <img
          src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80021.jpg"
          alt="Logo"
          width="100" 
          height="50" 
        />
      </Link>
      <Nav className="mx-auto">
        <Link to={"/featured"} className="nav-link">Home</Link>
        <Link to={"/getall"} className="nav-link">All Books</Link>
        <Link to={"/addbook"} className="nav-link">Add Book</Link>
      </Nav>
      <Nav className="mr-auto text-white navbar-right d-flex align-items-center">
        <ProfileIcon />
        {email && (
          <span className="nav-link text-light p-2 m-2" style={{ position: "relative", zIndex: "1" }}>
            Welcome, {formattedUsername.split("@")[0]}
          </span>
        )}
        <button onClick={handleClick} className="btn btn-warning p-2 m-2 float-right" type="submit">
          <span className="text-dark" href="/">
            Logout
          </span>
        </button>
      </Nav>
    </Navbar>
  );
}

export default UserDashboard;

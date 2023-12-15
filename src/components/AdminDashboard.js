import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <Link to={"/"} className="navbar-brand">
                <img src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80021.jpg" width="100" height="50" alt="Logo" />
              </Link>
              <label className="display-8 fw-bold text-white text-uppercase ms-3">
                Book Store
              </label>
            </div>
            <Nav className="justify-content-center">
              <Nav.Link href="/users" className="mx-auto">UserList</Nav.Link>
              <Nav.Link href="/adminbooks" className="mx-2">BookList</Nav.Link>
              <Nav.Link href="/adminfeatured" className="mx-2">Featured Books</Nav.Link>
              <Nav.Link href="/addbook" className="mx-2">Add Book</Nav.Link>


            </Nav>
            <Nav className="mr-auto navbar-right">
        <button  className="btn btn-warning p-2 m-2 float-right" type="submit">
          <a className="text-dark" href="/">
            Logout
          </a>
        </button>
      </Nav>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default AdminDashboard;

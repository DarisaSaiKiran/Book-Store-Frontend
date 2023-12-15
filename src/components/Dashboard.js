import React from "react";
// import { Navbar } from "react-bootstrap";
import { Navbar,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook,faUser} from '@fortawesome/free-solid-svg-icons'


class Dashboard extends React.Component {
  render() {
    return (
 <div >
  <Navbar bg="dark" variant="dark">
                <Link to={"/"} className="navbar-brand">
                    <img src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_80021.jpg" width="100" height="50" />
                </Link>
                <label className="display-8  fw-bold text-white mx-auto  text-uppercase">
            Book Store{" "}
           </label>
           {/* <button  className="btn btn-warning me-2" type="submit">
             <a className="text-dark" href="/register">SignUp  </a> 
            </button> {' '}
           <button className="btn btn-warning  float-right me-2" type="submit">
             <a className="text-dark" href="/login">Login </a>   
            </button>{' '}
            <button className="btn btn-warning sm float-right me-3" type="submit">
              <a className="text-dark" href="/admin">Admin Login </a>        
             </button>{' '} */}

<Link to={"/register"} className="nav-link text-primary me-4">SignUp</Link>
<Link to={"/login"} className="nav-link text-white me-4">Login</Link>

             <Link to={"/admin"} className="nav-link text-primary me-3">Admin Login</Link>

           
             </Navbar>
             </div>
        );}
        
}
export default Dashboard;

// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';

import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes ,Navigate} from "react-router-dom";
import User from "./components/User";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import FeaturedBooks from "./components/FeaturedBooks";
import EditBook from "./components/EditBook";
import UserLayout from "./components/UserLayout";
import AdminLogin from "./components/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminBookList from "./components/AdminBookList";
import UserList from "./components/UserList";
import ProfileIcon from './components/ProfileIcon';
import ProfilePage from './components/ProfilePage';
import EditUser from './components/EditUser';
import AdminFeatured from './components/AdminFeatured';

function App() { 
  
  const [isAuthenticated] = useState(!!localStorage.getItem('userinfo')); // Check if user is logged in

const PrivateRoute = ({ element: Element ,...rest}) => {
  return isAuthenticated ? (
    <Element />
  ) : (
    <Navigate to="/login" replace />
  );
};
 
  return (
    <Router>
      <Routes>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/" element={<MainLayout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dash" element={<UserLayout/>}></Route>
        <Route path="/register" element={<User/>}></Route>
        <Route path="/addbook" element={<AddBook/>}></Route>
        <Route path="/getall" element={<BookList/>}></Route>
        <Route path="/featured" element={<FeaturedBooks/>}></Route>
        <Route path="/admin" element={<AdminLogin/>}></Route>
        <Route path="/edit/:id" element={<EditBook/>}></Route>
        <Route path="/admindash" element={<AdminLayout/>}></Route>
        <Route path="/adminbooks" element={<AdminBookList/>}></Route>
        <Route path="/users" element={<UserList/>}></Route>
        {/* <Route path="/dash" element={<PrivateRoute element={<UserLayout />} />} /> */}
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/edituser" element={<EditUser />}></Route>
        <Route path="/adminfeatured" element={<AdminFeatured />}></Route>





      </Routes>
    </Router>
  );
}

export default App;

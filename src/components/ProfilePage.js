import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDashboard from './UserDashboard';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProfilePage.css'; // Import the CSS file for styling

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    email: '',
    profileImageUrl: '',
    password: '',
  });

  const navigate = useNavigate(); // Access the navigate function

  // Function to fetch user details by email from the server
  const fetchUserDetailsByEmail = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userinfo'));
      const userEmail = userInfo.email;
      const response = await axios.get(`http://localhost:8082/user/email/${userEmail}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Function to handle input changes for the edit form
  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle the form submit for updating user details
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8082/user/${userDetails.id}`, updatedUser);
      setUserDetails(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetailsByEmail();
  }, []);

  return (
    <div>      <UserDashboard />
    <div className='bgad'>
      <div className="profile-card">
        {isEditing ? (
          <form onSubmit={handleFormSubmit} className="profile-details">
            <h2>Edit Profile</h2>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="profileImageUrl" style={'width=50%'}>Profile Image URL:</label>
              <input
                type="text"
                id="profileImageUrl"
                name="profileImageUrl"
                value={updatedUser.profileImageUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={updatedUser.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div className="profile-details">
            <h2>Profile Details</h2>
            <img src={userDetails.profileImageUrl || 'https://static.thenounproject.com/png/5034901-200.png'} alt="Profile" className="profile-image" />
            <p className='fw-bold text-uppercase'>
              <strong> {userDetails.username}</strong>
            </p>
            <p>
              <strong> {userDetails.email}</strong>
            </p>
            {/* Use Link component to navigate to /edituser */}
            <Link to="/edituser">
              <button>Edit</button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </div>

  );
};

export default ProfilePage;

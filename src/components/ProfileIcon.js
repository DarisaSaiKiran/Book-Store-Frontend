// ProfileIcon.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProfileIcon = () => {
  return (
    <Link to="/profile" className="nav-link text-info">
      <FontAwesomeIcon icon={faUser} size="lg" />
    </Link>
  );
};

export default ProfileIcon;

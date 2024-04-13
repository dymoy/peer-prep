import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
        <Link key={1} to="/">
            Home
          </Link>
          </li>
          <li>
          <Link key={2} to="/login">
            Login
          </Link>
          </li>
        </ul>
    </nav>
  );
};

export default Navigation;


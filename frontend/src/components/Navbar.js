import React from "react";
import "../App.css";
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper white">
          <Link className="brand-logo" to="/" >
            instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signin">signup</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            
            <li>
              <Link to="/create">Createpost</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

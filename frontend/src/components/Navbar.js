import React, { useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,

        <li>
          <Link to="/create">Createpost</Link>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signin">signup</Link>
        </li>,
      ];
    }
  };
  return (
    <div>
      <nav>
        <div className="nav-wrapper white">
          <Link className="brand-logo" to={state?"/":"/login"}>
            instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './MyNavbar.css';
import { AuthContext } from "../store/auth-context"

const MyNavbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <nav className="navbar">
      <ul>
        {isLoggedIn && (
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <NavLink to="/auth" activeClassName="active">
              Login
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <>
           
            <li>
              <button onClick={logoutHandler} className="logout-button">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MyNavbar;

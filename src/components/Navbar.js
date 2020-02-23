/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  const { auth, Logout } = props;
  return (
    <nav
      id={props.id || ""}
      className="navbar is-fresh is-transparent no-shadow"
      role="navigation"
      aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <div className="title">Servicario</div>
          </Link>

          <a className="navbar-item is-hidden-desktop is-hidden-tablet">
            <div
              id="menu-icon-wrapper"
              className="menu-icon-wrapper"
              style={{ visibility: "visible" }}>
              <svg width="1000px" height="1000px">
                <path
                  className="path1"
                  d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
                <path className="path2" d="M 300 500 L 700 500"></path>
                <path
                  className="path3"
                  d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
              </svg>
              <button id="menu-icon-trigger" className="menu-icon-trigger"></button>
            </div>
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar-menu" className="navbar-menu is-static">
          <div className="navbar-start">
            <a className="navbar-item is-hidden-mobile">
              <div
                id="menu-icon-wrapper"
                className="menu-icon-wrapper"
                style={{ visibility: "visible" }}>
                <svg width="1000px" height="1000px">
                  <path
                    className="path1"
                    d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
                  <path className="path2" d="M 300 500 L 700 500"></path>
                  <path
                    className="path3"
                    d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
                </svg>
                <button id="menu-icon-trigger" className="menu-icon-trigger"></button>
              </div>
            </a>
          </div>

          <div className="navbar-end">
            {auth && auth.isAuthResolved && (
              <div className="navbar-item is-secondary is-welcome">
                {`Welcome, ${auth.user && auth.user.fullName}`}
              </div>
            )}
            <Link to="/" className="navbar-item is-secondary">
              Home
            </Link>
            <Link to="/services" className="navbar-item is-secondary">
              Services
            </Link>
            <Link to="/faq" className="navbar-item is-secondary">
              Faq
            </Link>
            {auth && auth.isAuthResolved && (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Manage</a>
                <div className="navbar-dropdown">
                  <Link to="/services/new" className="navbar-item">
                    Create Service
                  </Link>
                  <Link to="/services/me" className="navbar-item">
                    Your Services
                  </Link>
                </div>
              </div>
            )}
            {auth && !auth.isAuthResolved && (
              <>
                <Link
                  to="/login"
                  className="navbar-item is-secondary modal-trigger"
                  data-modal="auth-modal">
                  Login
                </Link>
                <Link to="/register" className="navbar-item">
                  <span className="button signup-button rounded secondary-btn raised">
                    Register
                  </span>
                </Link>
              </>
            )}
            {auth && auth.isAuthResolved && (
              <div onClick={Logout} className="navbar-item">
                <span className="button signup-button rounded secondary-btn raised">
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

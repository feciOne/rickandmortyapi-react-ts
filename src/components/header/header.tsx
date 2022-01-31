import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../logo.svg';

function Header() {
  return (
    <header className="bd-header bg-dark py-3 d-flex align-items-stretch border-bottom border-dark sticky-top">
      <div className="container-fluid d-flex align-items-center">
        <Link to="/">
          <h1 className="d-flex align-items-center fs-4 text-white mb-0">
            <img src={logo} className="mx-3" alt="The Rick and Morty" />
            The Rick and Morty
          </h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;
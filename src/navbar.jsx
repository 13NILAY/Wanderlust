import React from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><i className="fa-regular fa-compass"></i></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/">All Listings</Link>
            <Link className="nav-link" to="/new">Add New Listing</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

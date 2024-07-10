import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><i className="fa-regular fa-compass"></i></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link" href="/">Home</a>
        <a className="nav-link" href="">All Listings</a>
        <a className="nav-link" href="/new">Add New Listing</a>
      </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
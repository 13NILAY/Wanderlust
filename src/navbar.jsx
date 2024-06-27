import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <nav class="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="/"><i class="fa-regular fa-compass"></i></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/listing">All Listings</a>
        <a class="nav-link" href="/listing/new">Add New Listing</a>
      </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
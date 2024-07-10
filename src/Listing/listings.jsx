import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import Footer from '../footer';

const Listings = () => {
  const [listing, setListing] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    
    navigate(`${id}`);
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch('http://localhost:8080/listing', {
          method: 'GET',
          // credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setListing(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  return (
    <>
      <Navbar />
      <h2 className='m-3'>All Listings</h2>
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 m-3">
        
        {listing.map((list) => (
          <div
            key={list._id }
            className="listing-card card"
            onClick={()=> handleClick(list._id)} 
            style={{ cursor: 'pointer'}}
          >
            <img src={list.image.url} className="card-img-top" alt={list.title} style={{ height: '20rem' }} />
            <div className='card-img-overlay'></div>
            <div className="card-body">
              <h5 className="card-title">{list.title}</h5>
              <p className="card-text">
                Price: {parseFloat(list.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </p>
              {/* <Link to={`/${list._id}`} className="btn btn-primary">View Listing</Link> */}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Listings;

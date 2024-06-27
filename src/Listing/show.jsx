import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '../navbar';
import Footer from '../footer';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [rating, setRating] = useState(3); // Default rating value
  const [comment, setComment] = useState('');
  const [validated, setValidated] = useState(false);

  const handleReview = async (event) => {
    event.preventDefault();
    setValidated(true);

    // Validate the form inputs
    if (!comment) {
      return;
    }

    const reviewData = {
      rating,
      comment,
    };

    try {
      const response = await fetch(`http://localhost:8080/listing/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      // Optionally, you can clear the form or show a success message here
      setRating(3); // Reset the rating
      setComment(''); // Clear the comment
      setValidated(false); // Reset validation
      // Optionally, refetch the listing to update the reviews
      fetchListing(); 
    } catch (error) {
      console.error('Error submitting the review:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/listing/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the listing');
      }

      // After successful deletion, navigate back to the listings page
      navigate('/listing');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchListing = async () => {
    try {
      const response = await fetch(`http://localhost:8080/listing/${id}`, {
        method: 'GET',
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

  useEffect(() => {
    fetchListing();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-8 offset-2">
            {listing && (
              <div className="card">
                <h2>{listing.title}</h2>
                <img src={listing.image.url} className="img-fluid card-img-top show-img small-img" alt="Listing" />
                <div className="card-body m-2">
                  <h6 className="card-text mt-2">{listing.description}</h6>
                  <ul className="list-group col-6">
                    <li className="list-group-item">Price: {parseFloat(listing.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</li>
                    <li className="list-group-item">Location: {listing.location}</li>
                    <li className="list-group-item">Country: {listing.country}</li>
                  </ul>
                  <Link to="edit" state={{ listing }} className="btn btn-dark edit-btn mt-3">
                    Edit
                  </Link>
                  <button onClick={handleDelete} className="btn btn-dark mt-3 ms-2">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col-8 offset-2">
            <hr />
            <h4>Leave a Review</h4>
            <form onSubmit={handleReview} noValidate className={`needs-validation ${validated ? 'was-validated' : ''}`}>
              <div className="mb-2 mt-3">
                <label htmlFor="rating" className="form-label">Rating &nbsp;&nbsp;</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  id="rating"
                  name="rating"
                  className="form-range"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Please provide a valid rating.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Comments</label>
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="5"
                  required
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="invalid-feedback">
                  Please enter a comment.
                </div>
              </div>
              <button type="submit" className="btn btn-outline-dark mb-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Show;

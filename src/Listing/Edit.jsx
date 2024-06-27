import React, { useState, useEffect } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import Navbar from '../navbar';
import Footer from '../footer';

const Edit = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { listing } = location.state || {};
  const [newListing, setNewListing] = useState(listing);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (listing) {
      setNewListing(listing);
    }
  }, [listing]);

  if (!listing) {
    return <div>No listing data provided.</div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [field, subfield] = name.split('.');

    if (subfield) {
      setNewListing((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subfield]: value,
        },
      }));
    } else {
      setNewListing((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await fetch(`http://localhost:8080/listing/${listing._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newListing),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);
        // You can redirect or clear the form here if needed
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
    navigate("/listing");
  };

  return (
    <>
      <Navbar />
      <div className="row mt-3">
        <div className="col-8 offset-2">
          <h3>Edit your Listing</h3>
          <form onSubmit={handleSubmit} noValidate className={`needs-validation ${validated ? 'was-validated' : ''}`}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={newListing.title}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Please provide a valid title.
              </div>
              <div className="valid-feedback">
                Title looks good!
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                name="description"
                value={newListing.description}
                onChange={handleChange}
                className="form-control"
                required
              ></textarea>
              <div className="invalid-feedback">
                Please enter a short description.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="image.url" className="form-label">Image Link</label>
              <input
                name="image.url"
                value={newListing.image.url}
                onChange={handleChange}
                type="text"
                className="form-control"
                
              />
              <div className="invalid-feedback">
                Please provide a valid image URL.
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-4">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  name="price"
                  value={newListing.price}
                  onChange={handleChange}
                  type="number"
                  className="form-control"
                  required
                />
                <div className="invalid-feedback">
                  Price should be valid.
                </div>
              </div>
              <div className="mb-3 col-md-8">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  name="country"
                  value={newListing.country}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  required
                />
                <div className="invalid-feedback">
                  Country name should be valid.
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                name="location"
                value={newListing.location}
                onChange={handleChange}
                type="text"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Location should be valid.
              </div>
            </div>
            <button className="btn btn-dark edit-btn mb-3" type="submit">Edit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edit;

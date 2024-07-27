import React, { useState,useEffect } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import AlertError from '../AlertError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';



const New = () => {
  
  const [error, setError] = useState({
    message: "",
    status: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: {
      filename: '',
      url: '',
    },
    price: '',
    country: '',
    location: '',
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [field, subfield] = name.split('.');

    if (subfield) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subfield]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleClick=()=>{
    setShowAlert(false);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await fetch('http://localhost:8080/listing/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if(response.status>=400 && response.status<=510){
          setError({message:result.message});
          setShowAlert(true);
        }
        console.log(result);
      } catch (error) {
        console.error('Error submitting the form:', error);
      }
    }
    setValidated(true);
   
  }
  return (
    <>
      {/* <Navbar /> */}
      <div>
            {showAlert? <div><AlertError message={error.message} />
        <button onClick={handleClick} className="btn btn-dark add-btn offset-6  " type="submit">OK</button>
        </div>:""}
      </div>
      <div style={{ margin: '1rem' }} className="row">
      
        <div className="col-8 offset-2">
        <h3>Create a New Listing</h3>
        
          <form onSubmit={handleSubmit} noValidate className={`needs-validation ${validated ? 'was-validated' : ''}`}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                name="title"
                placeholder="Add a catchy title"
                type="text"
                value={formData.title}
                className="form-control"
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Please provide a valid title.
              </div>
              <div className='valid-feedback'>
                Title Looks Good !
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                name="description"
                placeholder="Enter description"
                value={formData.description}
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
                placeholder="Enter image URL"
                type="text"
                value={formData.image.url}
                className="form-control"
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                  Please enter a valid image URL.
                </div>

              
            </div>
            <div className="row">
              <div className="mb-3 col-md-4">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  name="price"
                  placeholder="1200"
                  type="text"
                  value={formData.price}
                  className="form-control"
                  onChange={handleChange}
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
                  placeholder="India"
                  type="text"
                  value={formData.country}
                  className="form-control"
                  onChange={handleChange}
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
                placeholder="Mumbai, Maharashtra"
                type="text"
                value={formData.location}
                className="form-control"
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Location should be valid.
              </div>
            </div>
            <button className="btn btn-dark add-btn" type="submit">Add</button>
          </form>
        </div>
      </div>
      <br />
      {/* <Footer /> */}
    </>
  );
};

export default New;

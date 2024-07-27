import React,{useState} from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import AlertError from '../AlertError';

const Signup = () => {
    const [error, setError] = useState({
      message: "",
      status: "",
    });
    const handleClick=()=>{
        setShowAlert(false);
      }
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [validated, setValidated] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
          try {
            const response = await fetch('http://localhost:8080/signup', {
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
        {/* <Navbar/> */}
        <div>
            {showAlert? <div><AlertError message={error.message} />
        <button onClick={handleClick} className="btn btn-dark add-btn offset-6  " type="submit">OK</button>
        </div>:""}
        </div>
            <div className="row mt-3">
                <h1 className='col-6 offset-3'>SignUp On Wanderlust</h1>
                <div className="col-6 offset-3">
                    <form onSubmit={handleSubmit} noValidate className={`needs-validation ${validated ? 'was-validated' : ''}`}>
                    <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">
                        Please provide a valid username.
                    </div>
                    <div className='valid-feedback'>
                        Username Looks Good !
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        name="email"
                        type="text"
                        value={formData.email}
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">
                        Please provide a valid email.
                    </div>
                    <div className='valid-feedback'>
                        Email is Correct !
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">
                        Please provide a valid password.
                    </div>
                    {/* <div className='valid-feedback'>
                        Password Looks Good !
                    </div> */}
                </div>
                <button className='mb-3 btn btn-success'>Submit</button>
                    </form>
                </div>
            </div>
        {/* <Footer/> */}
    </>
  )
}

export default Signup
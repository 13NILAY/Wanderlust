import React,{useState} from 'react'
import AlertError from '../AlertError';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate();
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
            const response = await fetch('http://localhost:8080/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            const result=await response.text();
            console.log(result);
            if(response.status>=400 && response.status<=510){
              setError({message:`${response.statusText}. Enter correct username and password.`});
              setShowAlert(true);
            }
            if(response.status==200){
              navigate("/");
            }
          } catch (error) {
            console.error('Error submitting the form:', error);
          }
        }
        setValidated(true);
       
      }
  return (
    <>
        <div>
            {showAlert? <div><AlertError message={error.message} />
        <button onClick={handleClick} className="btn btn-dark add-btn offset-6  " type="submit">OK</button>
        </div>:""}
        </div>
            <div className="row mt-3">
                <h1 className='col-6 offset-3 '>Login On Wanderlust</h1>
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
                   
                </div>
                <button className='mb-3 btn btn-success'>Login</button>
            </form>
                </div>
            </div>
    </>
  )
}

export default Login
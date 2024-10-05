import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [registerDetails, setRegisterDetails] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = () => {
    const { username, password } = registerDetails;

    // Check if a user is already registered
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    const isUserExist = existingUsers.some(user => user.username === username);
    if (isUserExist) {
      toast.error('Username already exists. Please choose a different username.');
      return;
    }

    // Add the new user to the existing users array
    existingUsers.push({ username, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful! Please log in.');
    navigate('/login'); 
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center mb-3'>Register Page</h2>
        <div className="row">
            <div className="col-lg-6 mx-auto border p-4 border-dark">
            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div className="form-group mb-3">
          <label className='mb-1'>Username</label>
          <input type="text" className="form-control" value={registerDetails.username}
                 onChange={(e) => setRegisterDetails({ ...registerDetails, username: e.target.value })} required />
        </div>
        <div className="form-group mb-3">
          <label className='mb-1'>Password</label>
          <input type="password" className="form-control" value={registerDetails.password}
                 onChange={(e) => setRegisterDetails({ ...registerDetails, password: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-dark mx-auto d-block">Register</button>
      </form>
      <div className="mt-3">
        <p className='text-end'>Already have an account? <Link to="/login" className='text-dark'>Login here</Link>.</p>
      </div>
            </div>
        </div>
    
    </div>
  );
};

export default RegisterPage;

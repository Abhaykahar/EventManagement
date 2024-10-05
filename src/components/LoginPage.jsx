import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = () => {
    const { username, password } = credentials;

    // Get registered users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the entered credentials match any user in localStorage
    const user = existingUsers.find(user => user.username === username && user.password === password);

    if (user) {
      // Set token and user info in localStorage
      const fakeToken = 'fake-jwt-token';
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful');
      navigate('/events'); // Redirect to events page
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center mb-3'>Login Page</h2>
      <div className="row">
        <div className="col-lg-6 mx-auto border p-4 shadow border-dark">
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="form-group mb-3">
          <label className='mb-1'>Username</label>
          <input type="text" className="form-control" value={credentials.username}
                 onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} required />
        </div>
        <div className="form-group mb-4">
          <label className='mb-1'>Password</label>
          <input type="password" className="form-control" value={credentials.password}
                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-dark mx-auto d-block">Login</button>
      </form>
      <div className="mt-4">
        <p className='text-end'>Don't have an account? <Link to="/register" className='text-dark'>Register here</Link>.</p>
      </div>
        </div>
      </div>
    </div>
    
  );
};

export default LoginPage;

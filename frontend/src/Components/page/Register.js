import React, { useState } from 'react';
import axios from 'axios';
import { showLoading, setNotLoading } from '../Redux/cartSlice.js';
import { useDispatch } from 'react-redux';

import '../css/signUp.css';
import AppLayout from '../layout/appLayout.js';

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? `/api/v1/POS/user/login` : `/api/v1/POS/user/newUser`;
    try {
      dispatch(showLoading()); 
      const response = await axios.post(endpoint, formData);
      setSuccess(isLogin ? 'Login successful!' : 'Registration successful!');
      setError(null);
      dispatch(setNotLoading())
      console.log('Form data submitted:', response.data);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      !isLogin ? setIsLogin(!isLogin): setIsLogin(isLogin)
    } catch (err) {
      dispatch(setNotLoading())
      setError(isLogin ? 'Login failed. Please try again.' : 'Registration failed. Please try again.');
      setSuccess(null);
      console.error('Error submitting form data:', err);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(null);
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <AppLayout>
      <div className="Register">
        <h1>RedCaff Pos</h1>
        <h3>{isLogin ? 'User Login' : 'User Sign-Up'}</h3>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <button onClick={toggleForm} className="toggle-button">
          {isLogin ? 'Switch to Sign-Up' : 'Switch to Login'}
        </button>
      </div>
    </AppLayout>
  );
};

export default Register;

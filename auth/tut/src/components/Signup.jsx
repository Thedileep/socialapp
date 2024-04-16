import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import './styles.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      // Handle successful signup here (e.g., update state, redirect user, etc.)
      navigate('/');
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
      console.error(error);
    }
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSignUp}>
          <div>Create Account</div>
          <input
            type="text"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
          <div>
            <Link to="/login">Already have an account? Login now.</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;

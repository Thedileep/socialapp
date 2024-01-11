import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { startSignup, signUpSuccess,signUpFailure } from '../../reducers/SignReducer';

import './styles.css';

function SignUp({ onSignUp }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.signUp);

  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    dispatch(startSignup());
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
  
      dispatch(signUpSuccess(user));
      navigate('/')
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };
  

  return (
    <>
      <div className="form">
        <form onSubmit={submit}>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          {error && <p>{error}</p>}
          <div>
            <Link to="/login">Already have an account? Login now.</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;

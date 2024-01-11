import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { startLogin, loginSuccess,loginFailure } from '../../reducers/LoginReducer';
import './styles.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {  loading=false, error=null, user=null } = useSelector((state) => state.login);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    dispatch(startLogin());
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      dispatch(loginSuccess({ displayName: user.displayName,email: user.email }));
      onLogin();
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
      // ...
    }
  };
  

  return (
    <>
      <div className="form">
        <form onSubmit={submit}>
          <div className="center">Login with existing account</div>
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
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          {error && <p>{error}</p>}

          <div>
            <Link to="/signup">Don't have an account? Register now.</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;

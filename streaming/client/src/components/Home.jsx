import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const signUpUser = useSelector((state) => state.signUp.user);
  const loginUser = useSelector((state) => state.login.user);

  const user = signUpUser || loginUser;

  const userName = user?.displayName || 'Anonymous';
  const userEmail = user?.email || 'Not provided';

  return (
    <div>
      <h1>Welcome to Health Monitor app</h1>
      <p>Name: {userName}</p>
      <p>Email: {userEmail}</p>
      <h3>click here for doctor appointment</h3>
      <button style={{ color: 'blue' }}>book</button>

    </div>
  );
}

export default Home;

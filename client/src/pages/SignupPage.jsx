import React, { useState } from 'react';
import '../styles.css'; // Import your styles

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = () => {
    // You can add your signup logic here
    // For simplicity, we'll just consider the user signed up if passwords match
    if (password === confirmedPassword) {
      setSignedUp(true);
    }
  };

  return (
    <div className="signup-page">
      <h2>Signup Page</h2>
      {signedUp ? (
        <p>You are signed up!</p>
      ) : (
        <div className="signup-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Signup</button>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
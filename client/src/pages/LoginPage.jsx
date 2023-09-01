import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import LOGIN_MUTATION from '../utils/mutations';
import '../styles.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
        variables: { username, password },
        onCompleted: (data) => {
          console.log('Login successful');
          // Handle token storage and user redirection here
        },
      });

    const handleLogin = () => {
    login();
    };
    
  
    return (
      <div className="login-page">
        <h2>Login</h2>
        {loggedIn ? (
          <p>You are logged in.</p>
        ) : (
          <div className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
loginpage
          <button onClick={handleLogin}>Login</button>
          <Link to="/signup" className='centeredlink'>Sign Up</Link>
=======
          <button onClick={handleLogin}></button>
dev
        </div>
      )}
    </div>
  );
};

export default LoginPage;
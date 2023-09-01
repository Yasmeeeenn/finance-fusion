import React, { useState} from 'react';
import '../styles.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
  
    const handleLogin = () => {
      // You can add your authentication logic here
      // For simplicity, we'll just check if the username and password are both "admin"
      if (username === 'admin' && password === 'admin') {
        setLoggedIn(true);
      }
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
          <button onClick={handleLogin}></button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
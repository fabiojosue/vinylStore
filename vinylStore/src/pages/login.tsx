import React, { useState } from 'react';
import '../Styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/UserServiceGraphql';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Add this line to import and assign the useNavigate hook

  const handleLogin = async (e: React.FormEvent) => { // Add 'async' keyword to the handleLogin function
    e.preventDefault();
    try {
      const user = { username, password };
      const token = await loginUser(user);
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
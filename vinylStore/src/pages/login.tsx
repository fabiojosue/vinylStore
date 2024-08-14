import React, { useState } from 'react';
import '../Styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/UserServiceGraphql';
import icon from '../assets/vinylicon.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = { username, password };
      await loginUser(user);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* <h2>Login</h2> */}
        <div className="center">
        <img src={icon} alt="avatar" className="avatar2" />
        </div>
        
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
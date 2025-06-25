import React, { useState } from 'react';

function Signup({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
      alert('Username already exists!');
    } else {
      users[username] = { password, entries: [] };
      localStorage.setItem('users', JSON.stringify(users));
      onSignup(username);
    }
  };

  return (
    <div className="auth-box">
      <h2>Sign Up</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;

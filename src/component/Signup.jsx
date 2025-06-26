import React, { useState } from 'react';

const API = import.meta.env.VITE_API_URL;

function Signup({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    console.log("API URL =", import.meta.env.VITE_API_URL);
    try {
      const res = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      onSignup(username); // call the parent to mark the user as logged in
    } catch (error) {
      alert('Signup failed: ' + error.message);
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

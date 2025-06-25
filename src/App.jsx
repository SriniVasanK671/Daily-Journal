import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:5000/api';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      onLogin(username);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function Signup({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Signup failed');
      await res.text();
      onSignup(username);
    } catch (err) {
      alert(err.message);
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

function Journal({ user }) {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');

  const fetchEntries = async () => {
    const res = await fetch(`${API}/entries/${user}`);
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const addEntry = async () => {
    if (!text.trim()) return;
    const newEntry = {
      username: user,
      text,
      date: new Date().toLocaleString()
    };
    await fetch(`${API}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    });
    setText('');
    fetchEntries();
  };

  const deleteEntry = async (id) => {
    await fetch(`${API}/entries/${user}/${id}`, {
      method: 'DELETE'
    });
    fetchEntries();
  };

  return (
    <div className="App">
      <h1>{user}'s Journal</h1>
      <textarea rows="4" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your thoughts..." />
      <button onClick={addEntry}>Add Entry</button>
      <div className="entries">
        {entries.map((entry) => (
          <div key={entry._id} className="entry">
            <div className="entry-header">
              <span>{entry.date}</span>
              <button onClick={() => deleteEntry(entry._id)}>🗑️</button>
            </div>
            <p>{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(true);

  const handleLogin = (username) => setUser(username);
  const handleSignup = (username) => setUser(username);

  if (!user) {
    return (
      <div className="auth-wrapper">
        {isSignup ? <Signup onSignup={handleSignup} /> : <Login onLogin={handleLogin} />}
        <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: 'pointer', color: 'blue' }}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
        </p>
      </div>
    );
  }

  return <Journal user={user} />;
}

export default App;

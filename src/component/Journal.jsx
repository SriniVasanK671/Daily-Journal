import React, { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL;

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


export default Journal;

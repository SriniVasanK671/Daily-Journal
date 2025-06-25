import React, { useState, useEffect } from 'react';

function Journal({ user }) {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'));
    setEntries(users[user]?.entries || []);
  }, [user]);

  const saveEntries = (updatedEntries) => {
    const users = JSON.parse(localStorage.getItem('users'));
    users[user].entries = updatedEntries;
    localStorage.setItem('users', JSON.stringify(users));
  };

  const addEntry = () => {
    if (!text.trim()) return;
    const newEntry = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString()
    };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setText('');
    saveEntries(updatedEntries);
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((e) => e.id !== id);
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  return (
    <div className="App">
      <h1>{user}'s Journal</h1>
      <textarea rows="4" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your thoughts..." />
      <button onClick={addEntry}>Add Entry</button>
      <div className="entries">
        {entries.map((entry) => (
          <div key={entry.id} className="entry">
            <div className="entry-header">
              <span>{entry.date}</span>
              <button onClick={() => deleteEntry(entry.id)}>🗑️</button>
            </div>
            <p>{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal;

import React, { useEffect, useState } from 'react';

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });

  // Fetch all discussions from the server
  useEffect(() => {
    fetch('/api/discussions')
      .then((res) => res.json())
      .then((data) => setDiscussions(data))
      .catch((error) => console.error('Error fetching discussions:', error));
  }, []);

  // Submit a new discussion post
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/discussions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDiscussion),
    })
    setNewDiscussion({ title: '', content: '' });
    // Refresh the discussions list
    fetch('/api/discussions')
      .then((response) => response.json())
      .then((data) => setDiscussions(data))
      .catch((error) => console.error('Error fetching discussions:', error));
  };

  return (
    <div>
      <h1>Game Discussions</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newDiscussion.title}
          onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newDiscussion.content}
          onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
        ></textarea>
        <button type="submit">Post</button>
      </form>

      <div>
        <h2>Previous Discussions</h2>
        {discussions.map((discussion) => (
          <div key={discussion._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
            <h3>{discussion.title}</h3>
            <p>{discussion.content}</p>
            <p>
              <strong>By:</strong> {discussion.author || 'Anonymous'}
            </p>
            <p>
              <strong>Posted On:</strong> {new Date(discussion.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default DiscussionsPage;

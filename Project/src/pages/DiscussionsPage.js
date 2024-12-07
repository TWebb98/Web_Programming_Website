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
      .then(() => {
        setNewDiscussion({ title: '', content: '' });
        return fetch('/api/discussions'); // Refresh the discussions list
      })
      .then((response) => response.json())
      .then((data) => setDiscussions(data))
      .catch((error) => console.error('Error fetching discussions:', error));
  };

  // Submit a reply to a discussion
  const handleReplySubmit = (e, discussionId) => {
    e.preventDefault();
    const replyContent = e.target.reply.value;

    fetch(`/api/discussions/${discussionId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: replyContent, author: 'Anonymous' }),
    })
      .then(() => fetch('/api/discussions')) // Refresh the discussions list
      .then((response) => response.json())
      .then((data) => setDiscussions(data))
      .catch((error) => console.error('Error submitting reply:', error));

    e.target.reset(); // Reset the reply form
  };

  return (
    <div>
      <h1>Game Discussions</h1>

      <div id="newPostForm">
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        id="formUser"
        maxLength="15"
        placeholder='Username'
        value={newDiscussion.author}
        onChange={(e) => setNewDiscussion({...newDiscussion, author: e.target.value})} />
        <br />

        <input
          type="text"
          placeholder="Title"
          value={newDiscussion.title}
          onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
        />
        <br />

        <textarea
          placeholder="Content"
          value={newDiscussion.content}
          onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
        ></textarea>
        <br />

        <button type="submit" >Post</button>
      </form>
      </div>

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
            <div>
              <h4>Replies:</h4>
              {discussion.replies.map((reply, index) => (
                <div key={index} style={{ marginLeft: '20px', border: '1px solid #ddd', padding: '10px' }}>
                  <p><strong>{reply.author}:</strong> {reply.content}</p>
                  <p><em>{new Date(reply.createdAt).toLocaleString()}</em></p>
                </div>
              ))}
              <form onSubmit={(e) => handleReplySubmit(e, discussion._id)}>
                <input type="text" name="reply" placeholder="Write a reply..." required />
                <button type="submit">Reply</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionsPage;


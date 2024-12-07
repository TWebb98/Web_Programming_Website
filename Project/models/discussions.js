const mongoose = require('mongoose');

// Schema for Replies
const ReplySchema = new mongoose.Schema({
  author: { type: String, default: 'Anonymous' }, // Author of the reply
  content: { type: String, required: true },      // Content of the reply
  createdAt: { type: Date, default: Date.now },   // Timestamp
});

// Schema for Discussions
const DiscussionSchema = new mongoose.Schema({
  title: { type: String, required: true },        // Title of the discussion
  content: { type: String, required: true },      // Main content of the discussion
  author: { type: String, default: 'Anonymous' }, // Author of the discussion
  createdAt: { type: Date, default: Date.now },   // Timestamp
  replies: [ReplySchema],                         // Array of replies
});

// Export the Mongoose Model
module.exports = mongoose.model('Discussion', DiscussionSchema);

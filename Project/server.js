//server.js for discussion website
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

// Import the Discussion model
const Discussion = require('./models/discussion');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projectdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Create the Hapi server
const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: '0.0.0.0',
  });

  // Define routes
  server.route([
    // Get all discussions
    {
      method: 'GET',
      path: '/api/discussions',
      handler: async (request, h) => {
        try {
          const discussions = await Discussion.find();
          return h.response(discussions).code(200);
        } catch (err) {
          console.error(err);
          return h.response({ error: 'Failed to fetch discussions' }).code(500);
        }
      },
    },
    // Create a new discussion
    {
      method: 'POST',
      path: '/api/discussions',
      handler: async (request, h) => {
        try {
          const { title, content, author } = request.payload;
          const newDiscussion = new Discussion({
            title,
            content,
            author: author || 'Anonymous', // Default to "Anonymous" if no author is provided
            createdAt: new Date(),
          });
          const savedDiscussion = await newDiscussion.save();
          return h.response(savedDiscussion).code(201);
        } catch (err) {
          console.error(err);
          return h.response({ error: 'Failed to create discussion' }).code(500);
        }
      },
    },
    // Add a reply to a discussion
    {
      method: 'POST',
      path: '/api/discussions/{id}/replies',
      handler: async (request, h) => {
        try {
          const { id } = request.params;
          const { author, content } = request.payload;

          const discussion = await Discussion.findById(id);
          if (!discussion) {
            return h.response({ error: 'Discussion not found' }).code(404);
          }

          discussion.replies.push({
            author,
            content,
            createdAt: new Date(),
          });
          const updatedDiscussion = await discussion.save();
          return h.response(updatedDiscussion).code(200);
        } catch (err) {
          console.error(err);
          return h.response({ error: 'Failed to add reply' }).code(500);
        }
      },
    },
    // Get a specific discussion by ID
    {
      method: 'GET',
      path: '/api/discussions/{id}',
      handler: async (request, h) => {
        try {
          const { id } = request.params;
          const discussion = await Discussion.findById(id);
          if (!discussion) {
            return h.response({ error: 'Discussion not found' }).code(404);
          }
          return h.response(discussion).code(200);
        } catch (err) {
          console.error(err);
          return h.response({ error: 'Failed to fetch discussion' }).code(500);
        }
      },
    },
  ]);

  // Start the server
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

// Handle server initialization errors
process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();

const express = require('express');
const router = express.Router();
const posts = require('../data/posts.json');

// Get all posts for a user
router.get('/:id/posts', (req, res) => {
  const userId = parseInt(req.params.id);
  const page = parseInt(req.query.page) || 1; // default to page 1
  const pageSize = parseInt(req.query.pageSize) || 5; // default to 5 posts per page
  console.log(userId);
  // Filter posts for this user
  const userPosts = posts.filter((p) => p.userId === userId);

  // Calculate start and end index for slicing
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice posts for the current page
  const pagedPosts = userPosts.slice(startIndex, endIndex);

  // Send posts and total count
  res.json({
    posts: pagedPosts,
    total: userPosts.length,
  });
});

// Get a single post by postId
router.get('/post/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

// Simulated post update
router.post('/:id/post/:postId', (req, res) => {
  const { id, postId } = req.params;
  const { title, body } = req.body;

  console.log(`Received post update for user ${id}, post ${postId}:`, {
    title,
    body,
  });

  res.json({
    message: 'Post update received',
    postId,
    userId: id,
    updated: { title, body },
  });
});

module.exports = router;

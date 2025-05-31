import { Router, Request, Response } from 'express';
import posts from '../../data/posts.json' with { type: 'json' };

const router = Router();

// Type definition for a post
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// GET all posts for a user with pagination
router.get('/:id/posts', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 5;

  const userPosts = (posts as Post[]).filter((p) => p.userId === userId);
  const startIndex = (page - 1) * pageSize;
  const pagedPosts = userPosts.slice(startIndex, startIndex + pageSize);

  res.json({
    posts: pagedPosts,
    total: userPosts.length,
  });
});

// GET a single post by postId
router.get('/post/:postId', (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const post = (posts as Post[]).find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
});

// Simulated POST update to a post
router.post('/:id/post/:postId', (req: Request, res: Response) => {
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

export default router;

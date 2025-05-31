import { Router, Request, Response } from 'express';
import users from '../../data/users.json' with { type: 'json' };

const router = Router();

// Define User interface
interface User {
  id: number;
  name: string;
  email: string;
  // add more fields if needed
}

// GET all users
router.get('/', (_req: Request, res: Response) => {
  res.json(users);
});

// GET single user by ID
router.get('/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = (users as User[]).find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

export default router;

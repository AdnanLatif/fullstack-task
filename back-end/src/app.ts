import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

export default app;

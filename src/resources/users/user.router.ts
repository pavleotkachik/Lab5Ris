import { Router } from 'express'

import User from './user.model'
import * as usersService from './user.service'
import Post from '../posts/post.model';
import * as postsService from '../posts/post.service';
import * as commentsService from '../comments/comment.service';
import Comment from '../comments/comment.model';

const router = Router();

router.route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    if (![ 'name', 'login', 'password', 'email' ].every(f =>
      typeof req.body[f] === 'string'))
        return res.status(400).json({ error: 'Bad request' })

    try {
      const user = await usersService.create(req.body)

      res.status(201).json(User.toResponse(user))
    } catch (e) {
      res.status(500)
      switch ((e as Error).message) {
        case 'User already exists':
          res.status(409).json({ error: 'User already exists' })
          break
        default:
          res.json({ error: 'Internal error' })
          break
      }
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    const user = await usersService.findOne(u => u.id === req.params.id)

    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json(User.toResponse(user))
  })
  .delete(async (req, res) => {
    const [ deletedUser ] = await usersService.deleteMany(u => u.id === req.params.id)

    if (!deletedUser) return res.status(404).json({ error: 'User not found' })

    res.json(User.toResponse(deletedUser))
  })
  .put(async (req, res) => {
    try {
      const updatedUser = await usersService.update(req.params.id, req.body)
      return res.json(User.toResponse(updatedUser))
    } catch (e) {
      res.status(500)
      switch ((e as Error).message) {
        case 'User not found':
          res.status(404).json({ error: 'User not found' })
          break
        case 'User with this login already exists':
          res.status(409).json({ error: 'User with this login already exists' })
          break
        default:
          res.json({ error: 'Internal error' })
          break
      }
    }
  })

router.get('/:id/comments', async (req, res) => {
  const user = await usersService.findOne(u => u.id === req.params.id)

  if (!user) return res.status(404).json({ error: 'User not found' })

  const comments = await commentsService.findMany(c => c.userId === req.params.id)

  res.json(comments.map(Comment.toResponse))
})

router.get('/:id/posts', async (req, res) => {
  const user = await usersService.findOne(u => u.id === req.params.id)

  if (!user) return res.status(404).json({ error: 'User not found' })

  const posts = await user.getPosts()

  res.json(posts.map(Post.toResponse))
})

export default router;

import { Router } from 'express';
import * as commentsService from './comment.service'
import Comment from './comment.model';
import User from '../users/user.model';
import Post from '../posts/post.model';

const router = Router()

router.route('/')
  .get(async (req, res) => {
    const posts = await commentsService.getAll()
    res.json(posts.map(Comment.toResponse))
  })
  .post(async (req, res) => {
    if (![ 'text' ].every(f =>
      typeof req.body[f] === 'string'))
      return res.status(400).json({ error: 'Bad request' })

    try {
      const comment = await commentsService.create(req.body)
      res.status(201).json(Comment.toResponse(comment))
    } catch (e) {
      res.status(500)
      switch ((e as Error).message) {
        case 'User not found':
          res.status(400).json({ error: 'User not found' })
          break
        case 'Post not found':
          res.status(400).json({ error: 'Post not found' })
          break
        default:
          res.json({ error: 'Internal error' })
          break
      }
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    const comment = await commentsService.findOne(c => c.id === req.params.id)

    if (!comment) return res.status(404).json({ error: 'Comment not found' })

    res.json(Comment.toResponse(comment))
  })
  .delete(async (req, res) => {
    const [ deletedComment ] = await commentsService.deleteMany(c => c.id === req.params.id)

    if (!deletedComment) return res.status(404).json({ error: 'Comment not found' })

    res.json(Comment.toResponse(deletedComment))
  })
  .put(async (req, res) => {
    try {
      const updatedComment = await commentsService.update(req.params.id, req.body)
      return res.json(Comment.toResponse(updatedComment))
    } catch (e) {
      res.status(500)
      switch ((e as Error).message) {
        default:
          res.json({ error: 'Internal error' })
          break
      }
    }
  })

router.get('/:id/user', async (req, res) => {
  const comment = await commentsService.findOne(c => c.id === req.params.id)

  if (!comment) return res.status(404).json({ error: 'Comment not found' })

  const user = await comment.getUser()

  if (!user) return res.status(500).json({ error: 'Failed to get user' })

  res.json(User.toResponse(user))
})

router.get('/:id/post', async (req, res) => {
  const comment = await commentsService.findOne(c => c.id === req.params.id)

  if (!comment) return res.status(404).json({ error: 'Comment not found' })

  const post = await comment.getPost()

  if (!post) return res.status(500).json({ error: 'Failed to get post' })

  res.json(Post.toResponse(post))
})

export default router
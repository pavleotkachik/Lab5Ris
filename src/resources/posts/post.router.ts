import { Router } from 'express';
import * as postsService from './post.service'
import * as commentsService from '../comments/comment.service'
import Post from './post.model';
import User from '../users/user.model';
import Comment from '../comments/comment.model';

const router = Router()

router.route('/')
  .get(async (req, res) => {
    const posts = await postsService.getAll()
    res.json(posts.map(Post.toResponse))
  })
  .post(async (req, res) => {
    if (![ 'title', 'text', 'userId' ].every(f =>
      typeof req.body[f] === 'string'))
        return res.status(400).json({ error: 'Bad request' })

    try {
      const post = await postsService.create(req.body)
      res.status(201).json(Post.toResponse(post))
    } catch (e) {
      res.status(500)
      switch ((e as Error).message) {
        case 'User not found':
          res.status(400).json({ error: 'User not found' })
          break
        default:
          res.json({ error: 'Internal error' })
          break
      }
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    const post = await postsService.findOne(p => p.id === req.params.id)

    if (!post) return res.status(404).json({ error: 'Post not found' })

    res.json(Post.toResponse(post))
  })
  .delete(async (req, res) => {
    const [ deletedPost ] = await postsService.deleteMany(p => p.id === req.params.id)

    if (!deletedPost) return res.status(404).json({ error: 'Post not found' })

    res.json(Post.toResponse(deletedPost))
  })
  .put(async (req, res) => {
    try {
      const updatedPost = await postsService.update(req.params.id, req.body)
      return res.json(Post.toResponse(updatedPost))
    } catch (e) {
      res.status(500)
      switch ((e as Error).message) {
        case 'Post not found':
          res.status(404).json({ error: 'Post not found' })
          break
        case 'User not found':
          res.status(400).json({ error: 'Post not found' })
          break
        default:
          res.json({ error: 'Internal error' })
          break
      }
    }
  })

router.get('/:id/user', async (req, res) => {
  const post = await postsService.findOne(p => p.id === req.params.id)

  if (!post) return res.status(404).json({ error: 'Post not found' })

  const user = await post.getUser()

  if (!user) return res.status(500).json({ error: 'Failed to get user' })

  res.json(User.toResponse(user))
})

router.get('/:id/comments', async (req, res) => {
  const post = await postsService.findOne(p => p.id === req.params.id)

  if (!post) return res.status(404).json({ error: 'Post not found' })

  const comments = await commentsService.findMany(c => c.postId === req.params.id)

  res.json(comments.map(Comment.toResponse))
})

export default router
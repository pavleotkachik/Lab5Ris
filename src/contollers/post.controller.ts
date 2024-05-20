import { Request, Response } from 'express'
import * as PostService from '../services/post.service'

export const getAllPosts = async (_req: Request, res: Response): Promise<void> => {
  const posts = PostService.getAllPosts()
  res.json(posts)
}

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  if (!id) {
    res.status(400).send('Post ID is required')
    return
  }
  const post = PostService.getPostById(id)
  if (post) {
    res.json(post)
  } else {
    res.status(404).send('Post not found')
  }
}

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const post = PostService.createPost(req.body)
  res.status(201).json(post)
}

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  if (!id) {
    res.status(400).send('Post ID is required for update')
    return
  }
  const post = PostService.updatePost(id, req.body)
  if (post) {
    res.json(post)
  } else {
    res.status(404).send('Post not found')
  }
}

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  if (!id) {
    res.status(400).send('Post ID is required for deletion')
    return
  }
  PostService.deletePost(id)
  res.status(204).send()
}
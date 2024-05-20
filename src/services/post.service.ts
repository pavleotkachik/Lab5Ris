import * as postRepository from '../repositories/memory.repository'
import Post from '../models/post.model'

export const getAllPosts = (): Post[] => postRepository.getPosts()

export const getPostById = (id: string): Post | undefined => postRepository.findPostById(id)

export const createPost = (postData: Post): Post => postRepository.addPost(postData)

export const updatePost = (id: string, updateData: Partial<Post>): Post | null => {
  const post = postRepository.findPostById(id)
  if (!post) return null
  Object.assign(post, updateData)
  return post
}

export const deletePost = (id: string): void => {
  postRepository.deletePost(id)
}

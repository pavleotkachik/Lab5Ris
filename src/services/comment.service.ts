import * as commentRepository from '../repositories/memory.repository'
import Comment from '../models/comment.model'

export const getAllComments = (): Comment[] => commentRepository.getComments()

export const getCommentById = (id: string): Comment | undefined => commentRepository.findCommentById(id)

export const createComment = (commentData: Comment): Comment => commentRepository.addComment(commentData)

export const updateComment = (id: string, updateData: Partial<Comment>): Comment | null => {
  const comment = commentRepository.findCommentById(id)
  if (!comment) return null
  Object.assign(comment, updateData)
  return comment
}

export const deleteComment = (id: string): void => {
  commentRepository.deleteComment(id)
}

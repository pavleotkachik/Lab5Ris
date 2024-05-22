import { randomUUID } from 'node:crypto';
import { findOne as findUser } from '../users/user.service';
import { findOne as findPost } from '../posts/post.service';

export interface ICommentUpdateOptions {
  text?: string
}

export interface ICommentOptions extends ICommentUpdateOptions {
  id?: string
  createdAt?: number
  userId?: string
  postId?: string
}

export const updatableFields: (keyof ICommentUpdateOptions)[] = [ 'text' ]

class Comment implements ICommentOptions {
  id: string
  text: string
  createdAt: number
  userId: string
  postId: string

  constructor(options?: ICommentOptions) {
    this.id = options?.id || randomUUID()
    this.text = options?.text || 'comment text'
    this.createdAt = options?.createdAt || Date.now()
    this.userId = options?.userId || ''
    this.postId = options?.postId || ''
  }

  async getUser() {
    return await findUser(u => u.id === this.userId)
  }

  async getPost() {
    return await findPost(p => p.id === this.postId)
  }

  static toResponse(comment: Comment) {
    const { id, text, createdAt, userId, postId } = comment
    return { id, text, createdAt, userId, postId }
  }
}

export default Comment
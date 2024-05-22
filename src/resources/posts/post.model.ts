import { randomUUID } from 'node:crypto'
import { findOne as findUser } from '../users/user.memory.repository'

export interface IPostUpdateOptions {
  title?: string
  text?: string
  userId?: string
}

export interface IPostOptions extends IPostUpdateOptions {
  id?: string
  createdAt?: number
}

export const updatableFields: (keyof IPostUpdateOptions)[] = [ 'title', 'text', 'userId' ]

class Post implements IPostOptions {
  id: string
  title: string
  text: string
  createdAt: number
  userId: string

  constructor(options?: IPostOptions) {
    this.id = options?.id || randomUUID()
    this.title = options?.title || 'TITLE'
    this.text = options?.text || 'text'
    this.createdAt = options?.createdAt || Date.now()
    this.userId = options?.userId || ''
  }

  async getUser() {
    return await findUser(u => u.id === this.userId)
  }

  static toResponse(post: Post) {
    const { id, title, text, createdAt, userId } = post
    return { id, title, text, createdAt, userId }
  }
}

export default Post
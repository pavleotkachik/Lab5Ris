import { randomUUID } from 'node:crypto';
import { findMany as findPosts } from '../posts/post.memory.repository'

export interface IUserUpdateOptions {
  email?: string
  name?: string
  login?: string
  password?: string
}

export interface IUserOptions extends IUserUpdateOptions {
  id?: string
}

export const updatableFields: (keyof IUserUpdateOptions)[] = [ 'email', 'name', 'login', 'password' ]

class User implements IUserOptions {
  id: string
  email: string
  name: string
  login: string
  password: string
  constructor(options?: IUserOptions) {
    this.id = options?.id || randomUUID()
    this.email = options?.email || 'example@mail.com'
    this.name = options?.name || 'USER'
    this.login = options?.login || 'user'
    this.password = options?.password || 'P@55w0rd'
  }

  async getPosts() {
    return await findPosts(p => p.userId === this.id)
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;

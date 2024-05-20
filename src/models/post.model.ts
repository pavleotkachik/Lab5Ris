import { v4 as uuidv4 } from 'uuid'

interface IPost {
  id?: string
  title: string
  content: string
  userId: string
  createdAt?: number
}

class Post {
  public id: string

  public title: string

  public content: string

  public userId: string

  public createdAt: number

  constructor({ id = uuidv4(), title, content, userId, createdAt = Date.now() }: IPost) {
    this.id = id
    this.title = title
    this.content = content
    this.userId = userId
    this.createdAt = createdAt
  }
}

export default Post
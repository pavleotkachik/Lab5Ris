import { v4 as uuidv4 } from 'uuid'

interface IComment {
  id?: string
  text: string
  userId: string
  postId: string
  createdAt?: number
}

class Comment {
  public id: string

  public text: string

  public userId: string

  public postId: string

  public createdAt: number

  constructor({ id = uuidv4(), text, userId, postId, createdAt = Date.now() }: IComment) {
    this.id = id
    this.text = text
    this.userId = userId
    this.postId = postId
    this.createdAt = createdAt
  }
}

export default Comment
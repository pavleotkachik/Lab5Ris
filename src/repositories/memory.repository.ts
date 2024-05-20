import User from '../models/user.model'
import Post from '../models/post.model'
import Comment from '../models/comment.model'

let users: User[] = []
let posts: Post[] = []
let comments: Comment[] = []

// функции для работы с данными
export const getUsers = (): User[] => users
export const getPosts = (): Post[] => posts
export const getComments = (): Comment[] => comments

export const addUser = (user: User): User => {
  users.push(user)
  return user
}

export const addPost = (post: Post): Post => {
  posts.push(post)
  return post
}

export const addComment = (comment: Comment): Comment => {
  comments.push(comment)
  return comment
}

export const findUserById = (id: string): User | undefined => users.find(user => user.id === id)
export const findPostById = (id: string): Post | undefined => posts.find(post => post.id === id)
export const findCommentById = (id: string): Comment | undefined => comments.find(comment => comment.id === id)

export const updateUser = (id: string, userData: Partial<User>): User | null => {
  const user = findUserById(id)
  if (user) {
    Object.assign(user, userData)
    return user
  }
  return null
}

export const updatePost = (id: string, postData: Partial<Post>): Post | null => {
  const post = findPostById(id)
  if (post) {
    Object.assign(post, postData)
    return post
  }
  return null
}

export const updateComment = (id: string, commentData: Partial<Comment>): Comment | null => {
  const comment = findCommentById(id)
  if (comment) {
    Object.assign(comment, commentData)
    return comment
  }
  return null
}

export const deleteUser = (id: string): void => {
  users = users.filter(user => user.id !== id)
  posts = posts.filter(post => post.userId !== id)
  comments = comments.filter(comment => comment.userId !== id)
}

export const deletePost = (id: string): void => {
  posts = posts.filter(post => post.id !== id)
  comments = comments.filter(comment => comment.postId !== id)
}

export const deleteComment = (id: string): void => {
  comments = comments.filter(comment => comment.id !== id)
}
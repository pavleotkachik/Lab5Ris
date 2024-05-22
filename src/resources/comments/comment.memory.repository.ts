import { findOne as findUser } from '../users/user.service'
import { findOne as findPost } from '../posts/post.service'
import Comment, { ICommentOptions, ICommentUpdateOptions, updatableFields } from './comment.model';

export type FilterComment = (p: Comment) => boolean
export type ICommentCreateOptions = Omit<ICommentOptions, 'id' | 'createdAt'>

const comments: Comment[] = []

const getAll = async () => comments
const findOne = async (func: FilterComment) => comments.find(func)
const findMany = async (func: FilterComment) => comments.filter(func)
const deleteMany = async (func: FilterComment) => {
  const postsToDelete = comments.filter(func)
  for (const post of postsToDelete) {
    const index = comments.indexOf(post)
    comments.splice(index, 1)
  }

  return postsToDelete
}
const create = async (options: ICommentCreateOptions) => {
  const user = await findUser(u => u.id === options.userId)
  if (!user)
    throw new Error('User not found')

  const post = await findPost(p => p.id === options.postId)
  if (!post)
    throw new Error('Post not found')

  const comment = new Comment(options)
  comments.push(comment)

  return comment
}

const update = async (id: string, options: ICommentUpdateOptions) => {
  const comment = await findOne(c => c.id === id)
  if (!comment) throw new Error('Comment not found')

  for (const field of updatableFields) {
    if (options[field]) comment[field] = options[field]!
  }

  await deleteMany(c => c.id === id)
  await create(comment)

  return comment
}

export { getAll, findOne, findMany, create, deleteMany, update, ICommentUpdateOptions }
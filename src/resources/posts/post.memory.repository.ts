import Post, { IPostUpdateOptions, updatableFields } from './post.model';
import { findOne as findUser } from '../users/user.service'

export type FilterPost = (p: Post) => boolean
export type IPostCreateOptions = Required<IPostUpdateOptions>

const posts: Post[] = []

const getAll = async () => posts
const findOne = async (func: FilterPost) => posts.find(func)
const findMany = async (func: FilterPost) => posts.filter(func)
const deleteMany = async (func: FilterPost) => {
  const postsToDelete = posts.filter(func)
  for (const post of postsToDelete) {
    const index = posts.indexOf(post)
    posts.splice(index, 1)
  }

  return postsToDelete
}
const create = async (options: IPostCreateOptions) => {
  const user = await findUser(u => u.id === options.userId)
  if (!user)
    throw new Error('User not found')

  const post = new Post(options)
  posts.push(post)

  return post
}

const update = async (id: string, options: IPostUpdateOptions) => {
  const post = await findOne(p => p.id === id)
  if (!post) throw new Error('Post not found')

  if (options.userId) {
    const userCheck = await findUser(u => u.id === options.userId)
    if (!userCheck) throw new Error('User not found')
  }

  for (const field of updatableFields) {
    if (options[field]) post[field] = options[field]!
  }

  await deleteMany(u => u.id === id)
  await create(post)

  return post
}

export { getAll, findOne, findMany, create, deleteMany, update, IPostUpdateOptions }
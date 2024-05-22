import * as postsRepo from './post.memory.repository'
import * as commentsService from '../comments/comment.service';

const getAll = () => postsRepo.getAll()
const findOne = async (func: postsRepo.FilterPost) => postsRepo.findOne(func)
const findMany = async (func: postsRepo.FilterPost) => postsRepo.findMany(func)
const deleteMany = async (func: postsRepo.FilterPost) => {
  const deletedPosts = await postsRepo.deleteMany(func)

  const ids = deletedPosts.map(p => p.id)

  await commentsService.deleteMany(c => ids.includes(c.postId))

  return deletedPosts
}
const create = async (options: postsRepo.IPostCreateOptions) => postsRepo.create(options)
const update = async (id: string, options: postsRepo.IPostUpdateOptions) => postsRepo.update(id, options)

export { getAll, findOne, findMany, deleteMany, create, update }
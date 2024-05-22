import * as usersRepo from './user.memory.repository'
import User from './user.model'
import * as commentsService from '../comments/comment.service'
// import * as postsService from '../posts/post.service'

type UserFilter = (u: User) => boolean

const getAll = () => usersRepo.getAll()
const findOne = async (func: UserFilter) => usersRepo.findOne(func)
const findMany = async (func: UserFilter) => usersRepo.findMany(func)
const deleteMany = async (func: UserFilter) => {
  const deletedUsers = await usersRepo.deleteMany(func)
  const ids = deletedUsers.map(u => u.id)

  await commentsService.deleteMany(c => ids.includes(c.userId))
  // await postsService.deleteMany(p => ids.includes(p.userId))

  return deletedUsers
}
const create = async (options: usersRepo.IUserCreateOptions) => usersRepo.create(options)
const update = async (id: string, options: usersRepo.IUserUpdateOptions) => usersRepo.update(id, options)

export { getAll, create, findOne, deleteMany, findMany, update };

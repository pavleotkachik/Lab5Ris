import User, { IUserUpdateOptions, updatableFields } from './user.model';

export type IUserCreateOptions = Required<IUserUpdateOptions>

const users: User[] = []

const getAll = async () => users
const findOne = async (func: (u: User) => boolean) => users.find(func)
const findMany = async (func: (u: User) => boolean) => users.filter(func)
const deleteMany = async (func: (u: User) => boolean) => {
  const usersToDelete = users.filter(func)
  for (const user of usersToDelete) {
    const index = users.indexOf(user)
    users.splice(index, 1)
  }

  return usersToDelete
}
const create = async (options: IUserCreateOptions) => {
  if (users.find(u => u.login === options.login))
    throw new Error('User already exists')

  const user = new User(options)
  users.push(user)

  return user
}

const update = async (id: string, options: IUserUpdateOptions) => {
  const user = await findOne(u => u.id === id)
  if (!user) throw new Error('User not found')

  if (options.login) {
    const loginCheck = await findOne(u => u.login === options.login)
    if (loginCheck) throw new Error('User with this login already exists')
  }

  for (const field of updatableFields) {
    if (options[field]) user[field] = options[field]!
  }

  await deleteMany(u => u.id === id)
  await create(user)

  return user
}

export { getAll, create, findOne, deleteMany, findMany, update, IUserUpdateOptions };

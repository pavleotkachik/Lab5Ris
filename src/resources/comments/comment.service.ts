import * as commentsRepo from './comment.memory.repository'

const getAll = () => commentsRepo.getAll()
const findOne = async (func: commentsRepo.FilterComment) => commentsRepo.findOne(func)
const findMany = async (func: commentsRepo.FilterComment) => commentsRepo.findMany(func)
const deleteMany = async (func: commentsRepo.FilterComment) => commentsRepo.deleteMany(func)
const create = async (options: commentsRepo.ICommentCreateOptions) => commentsRepo.create(options)
const update = async (id: string, options: commentsRepo.ICommentUpdateOptions) => commentsRepo.update(id, options)

export { getAll, findOne, findMany, deleteMany, create, update }
import * as userRepository from '../repositories/memory.repository'
import User from '../models/user.model'

export const getAllUsers = (): User[] => userRepository.getUsers()

export const getUserById = (id: string): User | undefined => userRepository.findUserById(id)

export const createUser = (userData: User): User => userRepository.addUser(userData)

export const updateUser = (id: string, updateData: Partial<User>): User | null => {
  const user = userRepository.findUserById(id)
  if (!user) return null
  Object.assign(user, updateData)
  return user
}

export const deleteUser = (id: string): void => {
  userRepository.deleteUser(id)
}
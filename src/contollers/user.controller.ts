import { Request, Response } from 'express'
import * as UserService from '../services/user.service'

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = UserService.getAllUsers()
  res.json(users.map(user => ({ id: user.id, name: user.name, email: user.email })))
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  if (!id) {
    res.status(400).send('User ID is required')
    return
  }
  const user = UserService.getUserById(id)
  if (user) {
    res.json({ id: user.id, name: user.name, email: user.email })
  } else {
    res.status(404).send('User not found')
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const user = UserService.createUser(req.body)
  res.status(201).json({ id: user.id, name: user.name, email: user.email })
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  if (!id) {
    res.status(400).send('User ID is required for update')
    return
  }
  const user = UserService.updateUser(id, req.body)
  if (user) {
    res.json({ id: user.id, name: user.name, email: user.email })
  } else {
    res.status(404).send('User not found')
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  if (!id) {
    res.status(400).send('User ID is required for deletion')
    return
  }
  UserService.deleteUser(id)
  res.status(204).send()
}
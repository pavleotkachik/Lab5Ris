import * as UserService from '../services/user.service.js';

export const getAllUsers = async (req, res) => {
  const users = UserService.getAllUsers();
  res.json(users.map(user => ({ id: user.id, name: user.name, email: user.email })));
};

export const getUserById = async (req, res) => {
  const user = UserService.getUserById(req.params.id);
  if (user) {
    res.json({ id: user.id, name: user.name, email: user.email });
  } else {
    res.status(404).send('User not found');
  }
};

export const createUser = async (req, res) => {
  const user = UserService.createUser(req.body);
  res.status(201).json({ id: user.id, name: user.name, email: user.email });
};

export const updateUser = async (req, res) => {
  const user = UserService.updateUser(req.params.id, req.body);
  if (user) {
    res.json({ id: user.id, name: user.name, email: user.email });
  } else {
    res.status(404).send('User not found');
  }
};

export const deleteUser = async (req, res) => {
  UserService.deleteUser(req.params.id);
  res.status(204).send();
};
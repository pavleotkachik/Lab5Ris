import { v4 as uuidv4 } from 'uuid'

interface IUser {
  id?: string
  name: string
  email: string
  password: string
}

class User {
  public id: string

  public name: string

  public email: string

  public password: string

  constructor({ id = uuidv4(), name, email, password }: IUser) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }
}

export default User

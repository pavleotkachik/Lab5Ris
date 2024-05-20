import { v4 as uuidv4 } from 'uuid';

class User {
  constructor({ id = uuidv4(), name, email, password } = {}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default User;

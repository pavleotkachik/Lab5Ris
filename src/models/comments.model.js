import { v4 as uuidv4 } from 'uuid';

class Comment {
  constructor({ id = uuidv4(), text, userId, postId, createdAt = Date.now() } = {}) {
    this.id = id;
    this.text = text;
    this.userId = userId;
    this.postId = postId;
    this.createdAt = createdAt;
  }
}

export default Comment;
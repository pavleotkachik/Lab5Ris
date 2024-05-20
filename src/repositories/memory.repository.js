let users = [];
let posts = [];
let comments = [];

// экспортируем функции для работы с данными
export const getUsers = () => users;
export const getPosts = () => posts;
export const getComments = () => comments;

export const addUser = (user) => {
  users.push(user);
  return user;
};

export const addPost = (post) => {
  posts.push(post);
  return post;
};

export const addComment = (comment) => {
  comments.push(comment);
  return comment;
};

export const findUserById = (id) => users.find(user => user.id === id);
export const findPostById = (id) => posts.find(post => post.id === id);
export const findCommentById = (id) => comments.find(comment => comment.id === id);

export const updateUser = (id, userData) => {
  const user = findUserById(id);
  if (user) {
    Object.assign(user, userData);
    return user;
  }
  return null;
};

export const updatePost = (id, postData) => {
  const post = findPostById(id);
  if (post) {
    Object.assign(post, postData);
    return post;
  }
  return null;
};

export const updateComment = (id, commentData) => {
  const comment = findCommentById(id);
  if (comment) {
    Object.assign(comment, commentData);
    return comment;
  }
  return null;
};

export const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
  posts = posts.filter(post => post.userId !== id);
  comments = comments.filter(comment => comment.userId !== id);
};

export const deletePost = (id) => {
  posts = posts.filter(post => post.id !== id);
  comments = comments.filter(comment => comment.postId !== id);
};

export const deleteComment = (id) => {
  comments = comments.filter(comment => comment.id !== id);
};
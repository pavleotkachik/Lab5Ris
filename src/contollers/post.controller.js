import * as PostService from '../services/post.service.js';

export const getAllPosts = async (req, res) => {
  const posts = PostService.getAllPosts();
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = PostService.getPostById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
};

export const createPost = async (req, res) => {
  const post = PostService.createPost(req.body);
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const post = PostService.updatePost(req.params.id, req.body);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
};

export const deletePost = async (req, res) => {
  PostService.deletePost(req.params.id);
  res.status(204).send();
};
import * as CommentService from '../services/comment.service.js';

export const getAllComments = async (req, res) => {
  const comments = CommentService.getAllComments();
  res.json(comments);
};

export const getCommentById = async (req, res) => {
  const comment = CommentService.getCommentById(req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
};

export const createComment = async (req, res) => {
  const comment = CommentService.createComment(req.body);
  res.status(201).json(comment);
};

export const updateComment = async (req, res) => {
  const comment = CommentService.updateComment(req.params.id, req.body);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
};

export const deleteComment = async (req, res) => {
  CommentService.deleteComment(req.params.id);
  res.status(204).send();
};
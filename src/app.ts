import express, { Request, Response, NextFunction } from 'express'

import userRouter from './resources/users/user.router'
import postRouter from './resources/posts/post.router'
import commentRouter from './resources/comments/comment.router'

import logger from './common/logger';

const app = express();

process.on('uncaughtException', (...args) =>
  logger.error('uncaughtException handled:', ...args))

process.on('unhandledRejection', (...args) =>
  logger.error('unhandledRejection handled:', ...args))

app.use(express.json());

app.use((req, res, next) => {

  res.once('finish', () =>
    logger.info('Received: URL(%s); Query(%o); Body(%o) and responded with %d',
      req.url, req.query, req.body, res.statusCode))
  next()
})

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next()
})

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: 'Internal error' })
  next()
})

export default app;

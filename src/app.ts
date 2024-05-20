import express from 'express'
import userRouter from './routes/user.routes'
import postRouter from './routes/post.routes'
import commentRouter from './routes/comment.routes'

const app = express()

app.use(express.json())

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!')
    return
  }
  next()
})

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

export default app
import request from 'supertest'
import app from '../app'

describe('Post API', () => {
  it('GET /posts - success', async () => {
    const result = await request(app).get('/posts').expect(200)
    expect(result.body).toBeInstanceOf(Array)
  })

  it('POST /posts - success', async () => {
    const postData = { title: 'New Post', content: 'Post content', userId: 1 }
    const result = await request(app)
      .post('/posts')
      .send(postData)
      .expect(201)
    expect(result.body.title).toEqual(postData.title)
    expect(result.body.content).toEqual(postData.content)
  })
})
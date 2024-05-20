import request from 'supertest'
import app from '../app'

describe('User API', () => {
  it('GET /users - success', async () => {
    const result = await request(app).get('/users').expect(200)
    expect(result.body).toBeInstanceOf(Array)
  })

  it('POST /users - success', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' }
    const result = await request(app)
      .post('/users')
      .send(userData)
      .expect(201)
    expect(result.body.name).toEqual(userData.name)
    expect(result.body.email).toEqual(userData.email)
  })
})

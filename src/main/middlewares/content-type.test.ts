import request from 'supertest'
import app from '../config/app'

describe('Content-Type Middleware', () => {
  test('Should return default Content-Type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content_type')
      .expect('Content-Type', /json/) // Todos as notações de tipo json
  })

  test('Should return Content-Type as xml when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('Content-Type', /xml/) // Todos as notações de tipo json
  })
})

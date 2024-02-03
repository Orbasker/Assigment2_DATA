require('supertest')
const app = require('../server') // Adjust the path to where your Express app is exported
// // app.use(express.json())
// // app.use(express.static(path.resolve(__dirname, 'public')))

describe('API Routes general', async () => {
  test('GET /api should respond with status code 404 for direct access', async () => {
    const response = await app.request(app).get('/api')
    expect(response.statusCode).toBe(200)
  })
})

// describe('API Routes', () => {
//   test('GET / should respond with status code 404 for direct access', async () => {
//     const response = await Request(app).get('/')
//     expect(response.statusCode).toBe(404)
//   })
// })

// describe('API Routes getitems ok', () => {
//   test('GET /api/getItems should respond with status code 200', async () => {
//     const response = await Request(app).get('/api/')
//     expect(response.statusCode).toBe(200)
//   })
// })

// // describe('API Routes getitem fail', () => {
// //   test('GET /api/getItem should respond with status code 404', async () => {
// //     const response = await Request(app).get('/api/unownkey')
// //     expect(response.statusCode).toBe(404)
// //   })
// // })

// // describe('API Routes', () => {
// //   test('GET /api/getItem/ should respond with status code 404', async () => {
// //     const response = await Request(app).get('/api/unownkey')
// //     expect(response.statusCode).toBe(404)
// //   })
// // })

// // describe('API Routes additem ok', () => {
// //   test('POST /api/addItem should respond with status code 200', async () => {
// //     const body = {
// //       name: 'face_mask',
// //       price: 2.5,
// //       quantity: 100
// //     }
// //     const Response = (await Request(app).post('/api/addItem')).send(body)
// //     expect(Response.statusCode).toBe(200)
// //   })
// // })

// // describe('API Routes getitem ok', () => {
// //   test('GET /api/getItem/:name should respond with status code 200', async () => {
// //     const response = await request(app).get('/api/face_mask')
// //     expect(response.statusCode).toBe(200)
// //   })
// // })

// // describe('API Routes getitem fail', () => {
// //   test('GET /api/getItem/:name should respond with status code 404', async () => {
// //     const response = await request(app).get('/api/face_mask1')
// //     expect(response.statusCode).toBe(404)
// //   })
// // }
// // )

// // describe('API Routes updateitem ok', () => {
// //   test('PUT /api/updateItem should respond with status code 200', async () => {
// //     const body = {
// //       name: 'face_mask',
// //       price: 2.5,
// //       quantity: 100
// //     }
// //     const response = (await request(app).put('/api')).body(body)
// //     expect(response.statusCode).toBe(200)
// //   })
// // })

// // describe('API Routes updateitem fail', () => {
// //   test('PUT /api/updateItem should respond with status code 404', async () => {
// //     const body = {
// //       name: 'face_mask1',
// //       price: 2.5,
// //       quantity: 100
// //     }
// //     const response = (await request(app).put('/api')).body(body)
// //     expect(response.statusCode).toBe(404)
// //   })
// // }
// // )

// // describe('API Routes deleteitem ok', () => {
// //   test('DELETE /api/deleteItem should respond with status code 200', async () => {
// //     const body = {
// //       name: 'face_mask',
// //       price: 2.5,
// //       quantity: 100
// //     }
// //     const response = (await request(app).delete('/api')).body(body)
// //     expect(response.statusCode).toBe(200)
// //   })
// // })

// // describe('API Routes deleteitem fail', () => {
// //   test('DELETE /api/deleteItem should respond with status code 404', async () => {
// //     const body = {
// //       name: 'face_mask1',
// //       price: 2.5,
// //       quantity: 100
// //     }
// //     const response = (await request(app).delete('/api')).body(body)
// //     expect(response.statusCode).toBe(404)
// //   })
// // }
// // )

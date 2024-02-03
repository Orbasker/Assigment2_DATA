const Handler = require('../handlers/DbHandler')
const TestHandler = new Handler('test')

await TestHandler.connect()

describe('Test DbHandler', () => {
  test('Test getSupplies', async () => {
    const response = await TestHandler.getSupplies()
    expect(response).toBeDefined()
  }, 10000)
  test('Test getSupply', async () => {
    const response = await TestHandler.getSupply('face_mask')
    expect(response).toBeDefined()
  }, 10000)
  test('Test addSupply', async () => {
    const body = {
      name: 'face_mask',
      price: 2.5,
      quantity: 100
    }
    const response = await TestHandler.addSupply(body)
    expect(response).toBeDefined()
  }, 10000)
  test('Test updateSupply', async () => {
    const body = {
      name: 'face_mask',
      price: 2.5,
      quantity: 100
    }
    const response = await TestHandler.updateSupply(body)
    expect(response).toBeDefined()
  }, 10000)
  test('Test deleteSupply', async () => {
    const response = await TestHandler.deleteSupply('face_mask')
    expect(response).toBeDefined()
  }, 10000)
}
)

await TestHandler.disconnect()

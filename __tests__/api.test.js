const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('../routers/api_router'); 
const logger = require('../logger');

// Setup an express server for testing

jest.mock('../logger', () => ({
  Logger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    error: jest.fn(),
  })),
}));

jest.mock('../controller/controller', () => ({
  Controller: jest.fn().mockImplementation(() => ({
    handleGetItems: jest.fn().mockResolvedValue([{ name: 'Item1', quantity: 10, price: 5 }]),
    handleGetItem: jest.fn().mockImplementation(name => {
      if (name === 'testItem') {
        return Promise.resolve({ name: 'testItem', quantity: 20, price: 15 }); // Mock response for 'testItem'
      }
      return Promise.reject({ message: 'Name not found' }); // Ensure rejection for other names, if needed
    }),
    handleAddItem: jest.fn().mockResolvedValue({ name: 'NewItem', quantity: 10, price: 5 }),
    handleUpdateItem: jest.fn().mockResolvedValue({ name: 'ExistingItem', quantity: 20, price: 15 }),
    handleDeleteItem: jest.fn().mockImplementation(name => {
      if (name === 'NewItem') {
        return Promise.resolve({});
      }
      return Promise.reject(new Error('Name not found'));
    }),
  })),
}));



const app = express();
app.use(bodyParser.json()); // Ensure the app can parse JSON request bodies
app.use('/api', apiRouter); // Mount the router under the '/api' prefix to mimic your actual server setup

describe('API Router Tests', () => {
  describe('GET /api/', () => {
    it('should get all items', async () => {
      const response = await request(app)
        .get('/api/')
        .expect('Content-Type', /json/)
        .expect(200);

      // Add specific assertions here based on the expected response structure
      expect(response.body).toEqual(expect.anything()); // Adjust according to your actual expected output
    });
  });

  describe('GET /api/:name', () => {
    it('should get an item by name', async () => {
      const name = 'testItem';
      // Assuming your controller's `handleGetItem` method is properly mocked or set up
      const response = await request(app)
        .get(`/api/${name}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(expect.anything()); // Adjust according to your actual expected output
    });
  });

  describe('POST /api/', () => {
    it('should add an item', async () => {
      const newItem = { name: 'NewItem', quantity: 10, price: 5 };
      const response = await request(app)
        .post('/api/')
        .send(newItem)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(expect.anything()); // This should be replaced with a more specific assertion
    });
  });

  describe('PUT /api/', () => {
    it('should update an item', async () => {
      const itemUpdate = { name: 'ExistingItem', quantity: 20, price: 15 };
      const response = await request(app)
        .put('/api/')
        .send(itemUpdate)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(expect.anything()); // Adjust based on your expected structure
    });
  });

  describe('DELETE /api/:name', () => {
    it('should delete an item by name', async () => {
      const name = 'NewItem'; // Ensure this matches a name that your mock will "successfully" delete
      const response = await request(app)
        .delete(`/api/${name}`)
        .expect(200); // Expect 200 OK if the deletion was "successful" according to your mock
  
      // Adjust this assertion based on the actual response structure for a successful deletion
      expect(response.body).toEqual(expect.anything());
    });
  });
  
});

// DbHandler.test.js
const mongoose = require('mongoose');
const EmergencySupply = require('../models/EmergenctSupply'); 
const DbHandler = require('../handlers/DbHandler');
const logger = require('../logger'); 

jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue({}),
  disconnect: jest.fn().mockResolvedValue({}),
  connection: {
    once: jest.fn(),
    readyState: 1, // Mock being connected
  },
}));

jest.mock('../models/EmergenctSupply', () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
  exists: jest.fn(),
}));

jest.mock('../logger', () => ({
  Logger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    error: jest.fn(),
  })),
}));

describe('DbHandler', () => {
  let dbHandler;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    // Initialize DbHandler with a mocked logger file path
    dbHandler = new DbHandler('/mocked/path/to/logfile');
  });

  // Example test for connect method
  describe('connect', () => {
    it('should connect to the database successfully', async () => {
      await dbHandler.connect();
      expect(mongoose.connect).toHaveBeenCalled();
    });
  });

  // Assuming your test file is located in /tests/DbHandler.test.js

describe('addSupply', () => {
  it('should add a new supply successfully', async () => {
    const newSupply = { name: 'Food', quantity: 50, price: 5 };
    EmergencySupply.create.mockResolvedValue(newSupply);

    const result = await dbHandler.addSupply(newSupply);

    expect(EmergencySupply.create).toHaveBeenCalledWith(newSupply);
    expect(result).toEqual(newSupply);
  });

  it('should handle errors when adding a new supply fails', async () => {
    EmergencySupply.create.mockRejectedValue(new Error('Error adding supply:'));
    await expect(dbHandler.addSupply({})).rejects.toThrow('Error adding supply:');
  });
});

describe('getSupply', () => {
  it('should retrieve a supply by name', async () => {
    const supplyName = 'Water';
    const supplyData = { name: 'Water', quantity: 100, price: 10 };
    EmergencySupply.findOne.mockResolvedValue(supplyData);

    const result = await dbHandler.getSupply(supplyName);

    expect(EmergencySupply.findOne).toHaveBeenCalledWith({ name: supplyName });
    expect(result).toEqual(supplyData);
  });
});

describe('updateSupply', () => {
  it('should update an existing supply', async () => {
    const supplyToUpdate = { name: 'Food', quantity: 60, price: 6 };
    EmergencySupply.findOneAndUpdate.mockResolvedValue(supplyToUpdate);

    const result = await dbHandler.updateSupply(supplyToUpdate);

    expect(EmergencySupply.findOneAndUpdate).toHaveBeenCalledWith({ name: supplyToUpdate.name }, supplyToUpdate, { new: false });
    expect(result).toEqual(supplyToUpdate);
  });
});

describe('deleteSupply', () => {
  it('should delete a supply by name', async () => {
    const supplyName = 'Food';
    EmergencySupply.findOneAndDelete.mockResolvedValue({ name: 'Food' });

    const result = await dbHandler.deleteSupply(supplyName);

    expect(EmergencySupply.findOneAndDelete).toHaveBeenCalledWith({ name: supplyName });
    expect(result).toHaveProperty('name', supplyName);
  });

  it('should handle errors when deletion fails', async () => {
    EmergencySupply.findOneAndDelete.mockRejectedValue(new Error('Failed to delete supply'));
    await expect(dbHandler.deleteSupply('Nonexistent')).rejects.toThrow('Failed to delete supply');
  });
});


// describe('disconnect', () => {
//   beforeEach(() => {
//     // Reset the mock for each test to ensure clean state
//     mongoose.disconnect.mockClear();
//     mongoose.connection.readyState = mongoose.ConnectionStates.connected;
//   });

//   it('should disconnect from the database when connected', async () => {
//     await dbHandler.disconnect();
//     expect(mongoose.disconnect).toHaveBeenCalled();
//     expect(console.log).toHaveBeenCalledWith('Disconnected from MongoDB database.');
//   });

//   it('should not attempt to disconnect if not connected', async () => {
//     // Simulate the database being disconnected
//     mongoose.connection.readyState = mongoose.ConnectionStates.disconnected;
    
//     await dbHandler.disconnect();
//     // Verify disconnect was not called since we're not connected
//     expect(mongoose.disconnect).not.toHaveBeenCalled();
//   });
// });


  // Add more tests here for other methods like getSupplies, addSupply, etc.

});






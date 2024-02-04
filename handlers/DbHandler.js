const mongoose = require('mongoose')
const EmergencySupply = require('../models/EmergenctSupply')
const logger = require('../logger')
require('dotenv').config()

class DbHandler {
  constructor (loggerFilepath) {
    const username = encodeURIComponent(process.env.MONGO_USERNAME)
    const password = encodeURIComponent(process.env.MONGO_PASSWORD)
    const cluster = process.env.MONGO_CLUSTER
    const dbname = process.env.MONGO_DBNAME
    const host = process.env.MONGO_HOST
    this.schema = EmergencySupply
    this.logger = new logger.Logger(loggerFilepath)
    this.url = `mongodb+srv://${username}:${password}@${cluster}.${host}${dbname}`
    this.connection = mongoose.connection
    this.connection.once('open', () => {
      this.logger.log('MongoDB database connection established successfully.')
      console.log('MongoDB database connection established successfully.')
    })
  }

  destroy () {
    this.disconnect()
  }

  async connect () {
    try {
      await mongoose.connect(this.url, {
      })
      this.connection.once('open', () => {
        this.logger.log('Connected to MongoDB database.')
        console.log('Connected to MongoDB database.')
        this.db = this.connection.db
      })
    } catch (error) {
      this.logger.error('Error connecting to MongoDB:', error.message)
      console.error('Error connecting to MongoDB:', error.message)
      // throw error;
    }
  }

  async getSupplies () {
    try {
      this.logger.log('Getting supplies...')
      return await this.schema.find({})
    } catch (error) {
      this.logger.error('Error getting supplies:', error.message)
      console.error('Error getting supplies:', error.message)
      throw error
    }
  }

  async getSupply (name) {
    try {
      this.logger.log('Getting supply...', name)
      return await this.schema.findOne({ name })
    } catch (error) {
      this.logger.error('Error getting supply:', error.message)
      console.error('Error getting supply:', error.message)
      throw error
    }
  }

  async addSupply (supply) {
    try {
      this.logger.log('Adding supply...', {
        name: supply.name,
        quantity: supply.quantity,
        price: supply.price
      })
      console.log('Adding supply...', {
        name: supply.name,
        quantity: supply.quantity,
        price: supply.price
      })
      return await this.schema.create(supply)
    } catch (error) {
      this.logger.error('Error adding supply:', error.message)
      console.error('Error adding supply:', error.message)
      throw error
    }
  }

  async updateSupply (supply) {
    try {
      this.logger.log('Updating supply...', {
        name: supply.name,
        quantity: supply.quantity,
        price: supply.price
      })
      console.log('Updating supply...', {
        name: supply.name,
        quantity: supply.quantity,
        price: supply.price
      })
      return await this.schema.findOneAndUpdate({ name: supply.name }, supply, { new: false })
    } catch (error) {
      this.logger.error('Error updating supply:', error.message)
      console.error('Error updating supply:', error.message)
      throw error
    }
  }

  async deleteSupply (name) {
    try {
      this.logger.log('Deleting supply...', name)
      return await this.schema.findOneAndDelete({ name })
    } catch (error) {
      this.logger.error('Error deleting supply:', error.message)
      console.error('Error deleting supply:', error.message)
      throw error
    }
  }

  async exists (name) {
    try {
      this.logger.log('Checking if supply exists...', name)
      return await this.schema.exists({ name })
    } catch (error) {
      this.logger.error('Error checking if supply exists:', error.message)
      console.error('Error checking if supply exists:', error.message)
      throw error
    }
  }

  async disconnect () {
    if (this.connection.readyState === mongoose.ConnectionStates.connected) {
      await mongoose.disconnect()
      console.log('Disconnected from MongoDB database.')
    }
  }
}

module.exports = DbHandler

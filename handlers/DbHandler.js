const mongoose = require("mongoose");
const EmergencySupply = require("../models/EmergencySupply");
const logger = require("../logger/logger");
require("dotenv").config();

class DbHandler {
  constructor(loggerFilepath) {
    this.schema = EmergencySupply;
    this.logger = new logger.Logger(loggerFilepath);
    this.url = this.constructConnectionString();
    this.connect();
  }

  constructConnectionString() {
    const username = encodeURIComponent(process.env.MONGO_USERNAME);
    const password = encodeURIComponent(process.env.MONGO_PASSWORD);
    const cluster = process.env.MONGO_CLUSTER;
    const dbname = process.env.MONGO_DBNAME;
    const host = process.env.MONGO_HOST;
    return `mongodb+srv://${username}:${password}@${cluster}.${host}${dbname}?retryWrites=true&w=majority`;
  }

  async connect() {
    this.logger.log("Connecting to MongoDB database...");
    await mongoose.connect(this.url);
    console.log("Connected to MongoDB database.");
    this.logger.log("Connected to MongoDB database.");
  }

  async getSupplies() {
    try {
      this.logger.log("Getting supplies...");
      return await this.schema.find({});
    } catch (error) {
      this.logger.error("Error getting supplies:", error.message);
      console.error("Error getting supplies:", error.message);
      throw error;
    }
  }

  async getSupply(name) {
    try {
      this.logger.log("Getting supply...", name);
      return await this.schema.findOne({ name });
    } catch (error) {
      this.logger.error("Error getting supply:", error.message);
      console.error("Error getting supply:", error.message);
      throw error;
    }
  }

  async addSupply(supply) {
    try {
      this.logger.log("Adding supply...", {
        name: supply.name,
        quantity: supply.quantity,
        price: supply.price,
      });
      console.log("Adding supply...", {
        name: supply.name,
        quantity: supply.quantity,
        price: supply.price,
      });
      return await this.schema.create(supply);
    } catch (error) {
      this.logger.error("Error adding supply:", error.message);
      console.error("Error adding supply:", error.message);
      throw error;
    }
  }

  async updateSupply(name, supply) {
    try {
      this.logger.log("Updating supply...", {
        name: supply.name,
        quantity: supply.quantity,
        price: supply.price,
      });
      console.log("Updating supply...", {
        name: supply.name,
        quantity: supply.quantity,
        price: supply.price,
      });
      return await this.schema.findOneAndUpdate({ name }, supply, {
        new: false,
      });
    } catch (error) {
      this.logger.error("Error updating supply:", error.message);
      console.error("Error updating supply:", error.message);
      throw error;
    }
  }

  async deleteSupply(name) {
    try {
      this.logger.log("Deleting supply...", name);
      return await this.schema.findOneAndDelete({ name });
    } catch (error) {
      this.logger.error("Error deleting supply:", error.message);
      console.error("Error deleting supply:", error.message);
      throw error;
    }
  }

  async exists(name) {
    try {
      this.logger.log("Checking if supply exists...", name);
      return await this.schema.exists({ name });
    } catch (error) {
      this.logger.error("Error checking if supply exists:", error.message);
      console.error("Error checking if supply exists:", error.message);
      throw error;
    }
  }
}

module.exports = { DbHandler };

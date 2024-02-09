const DBHandler = require("../handlers/index");
const logger = require("../logger/index");

class Controller {
  constructor(loggerFilepath) {
    this.inventory = new DBHandler.DbHandler("DB logs");
    this.logger = new logger.Logger(loggerFilepath);
  }

  async handleGetItems() {
    try {
      return await this.inventory.getSupplies();
    } catch (error) {
      this.logger.error("Error getting supplies:", error.message);
      console.error("Error getting supplies:", error.message);
      throw error;
    }
  }

  async handleGetItem(name) {
    try {
      if (await this.inventory.exists(name)) {
        return await this.inventory.getSupply(name);
      }
      throw new Error("Name not found");
    } catch (error) {
      this.logger.error("Error getting supply:", error.message);
      console.error("Error getting supply:", error.message);
      throw error;
    }
  }

  async handleAddItem(supply) {
    try {
      if (await this.inventory.exists(supply.name)) {
        throw new Error("Name already exists - duplicate key");
      }
      return await this.inventory.addSupply(supply);
    } catch (error) {
      this.logger.error("Error adding supply:", error.message);
      console.error("Error adding supply:", error.message);
      throw error;
    }
  }

  async handleUpdateItem(name, supply) {
    try {
      if ((await this.inventory.exists(name)) === false) {
        throw new Error("Name not found");
      }
      return await this.inventory.updateSupply(name, supply);
    } catch (error) {
      this.logger.error("Error updating supply:", error.message);
      console.error("Error updating supply:", error.message);
      throw error;
    }
  }

  async handleDeleteItem(name) {
    if (!name) {
      throw new Error("No name provided");
    }
    if (name === "") {
      throw new Error("Empty name provided");
    }
    if ((await this.inventory.exists(name)) === false) {
      throw new Error("Name not found");
    }
    return await this.inventory.deleteSupply(name);
  }
}

module.exports = { Controller };

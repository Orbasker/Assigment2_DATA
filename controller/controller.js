// const { Inventory, InventoryItem } = require('../handlers/EmergencySuplliesInventory');
const DBHandler = require('../handlers/DbHandler')
const logger = require('../logger')

class Controller {
  constructor (loggerFilepath) {
    this.inventory = new DBHandler('DB logs')
    this.inventory.connect()
    this.logger = new logger.Logger(loggerFilepath)
  }

  async handleGetItems () {
    try {
      return await this.inventory.getSupplies()
    } catch (error) {
      this.logger.error('Error getting supplies:', error.message)
      console.error('Error getting supplies:', error.message)
      throw error
    }
  }

  async handleGetItem (name) {
    try {
      if (await this.inventory.exists(name)) {
        return await this.inventory.getSupply(name)
      }
      throw new Error('Name not found')
    } catch (error) {
      this.logger.error('Error getting supply:', error.message)
      console.error('Error getting supply:', error.message)
      throw error
    }
  }

  async handleAddItem (supply) {
    try {
      if (await this.inventory.exists(supply.name)) {
        throw new Error('Name already exists - duplicate key')
      }
      return await this.inventory.addSupply(supply)
    } catch (error) {
      this.logger.error('Error adding supply:', error.message)
      console.error('Error adding supply:', error.message)
      throw error
    }
  }

  async handleUpdateItem (supply) {
    try {
      if (await this.inventory.exists(supply.name) === false) {
        throw new Error('Name not found')
      }
      return await this.inventory.updateSupply(supply)
    } catch (error) {
      this.logger.error('Error updating supply:', error.message)
      console.error('Error updating supply:', error.message)
      throw error
    }
  }

  async handleDeleteItem (name) {
    if (!name) {
      throw new Error('No name provided')
    }
    if (name === '') {
      throw new Error('Empty name provided')
    }
    if (await this.inventory.exists(name) === false) {
      throw new Error('Name not found')
    }
    return await this.inventory.deleteSupply(name)
  }
}

// const url = require('url');

// class Controller {
//     constructor(filepath, logger_filepath) {
//         // this.inventory = new Inventory(filepath);
//         this.inventory = new dbHandler('DB logs');
//         this.inventory.connect();
//         this.logger = new logger.Logger(logger_filepath);
//     }

//     async handleGetItems(req, res) {
//         res.writeHeader(200, {'Content-Type': 'application/json'});
//         res.write(JSON.stringify(await this.inventory.getSupplies()));
//         res.end(
//             JSON.stringify({
//                 message: 'Items returned from the inventory!'
//             })
//         );
//         this.logger.log("Items returned from the inventory!")
//     }

//     async handleGetItem(id) {
//         const item = await this.inventory.getSupply(queryItem);
//         res.writeHeader(200, {'Content-Type': 'application/json'});
//         res.write(JSON.stringify(item));
//         res.end(
//             JSON.stringify({
//                 message: 'Item returned from the inventory!'
//             })
//         );
//         this.logger.log(`Item: ${item} returned from the inventory!`)

//     }

//     async handleAddItem(req, res) {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             try {
//                 const parsedBody = JSON.parse(body);
//                 this.inventory.addSupply(body);
//                 res.writeHeader(200, {'Content-Type': 'application/json'});
//                 res.end(
//                     JSON.stringify({
//                         item: item,
//                         message: 'Item has been added to the inventory!'
//                     })
//                 );
//                 this.logger.log(`New Item has been added to the inventory!
//                 {
//                       Body: ${body},
//                       }`);
//             }
//             catch (err) {
//                 res.writeHeader(400, {'Content-Type': 'text/plain'});
//                 res.end(
//                     JSON.stringify({
//                         message: '400 Bad Request',
//                         error: err.message

//                     })
//                 );
//                 this.logger.error(`400 Bad Request, ${err.message},
//                 {
//                         Body: ${body},
//                         }`);
//                 }
//         });
//     }

//     async handleUpdateItem(req, res) {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             try {
//                 const parsedBody = JSON.parse(body);
//                 this.inventory.updateSupply(body);
//                 res.writeHeader(200, {'Content-Type': 'application/json'});
//                 res.end(
//                     JSON.stringify({
//                         item: item,
//                         message: 'Item has been updated in the inventory!'
//                     })
//                 );
//                 this.logger.log(`Item has been updated in the inventory!
//                 {
//                       Name: ${item.name},
//                       Quantity: ${item.quantity},
//                       Price: ${item.price}
//                       }`);
//             }
//             catch (err) {
//                 res.writeHeader(400, {'Content-Type': 'text/plain'});
//                 res.end(
//                     JSON.stringify({
//                         message: '400 Bad Request',
//                         error: err.message

//                     })
//                 );
//                 this.logger.error(`400 Bad Request, ${err.message},
//                 {
//                         Name: ${body},
//                       }`);
//             }
//         });
//     }

//    async handleDeleteItem(req, res) {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             try {
//                 const parsedBody = JSON.parse(body);
//                 this.inventory.deleteSupply(parsedBody.id);
//                 res.writeHeader(200, {'Content-Type': 'application/json'});
//                 res.end(
//                     JSON.stringify({
//                         message: 'Item has been deleted from the inventory!'
//                     })
//                 );
//                 this.logger.log(`${parsedBody.name} Item has been deleted from the inventory!`);
//             }
//             catch (err) {
//                 res.writeHeader(400, {'Content-Type': 'text/plain'});
//                 res.end(
//                     JSON.stringify({
//                         message: '400 Bad Request',
//                         error: err.message

//                     })
//                 );
//                 this.logger.error(`400 Bad Request, ${err.message}`);
//             }
//         });
//     }
// }

module.exports = { Controller }

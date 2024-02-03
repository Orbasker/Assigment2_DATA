// // const { Inventory,InventoryItem } = require('./EmergenctSuplliesInventory');
// // const {Controller} = require('../controller/controller');
// const {Logger} = require('../logger');
// const url = require('url');
// const express = require('express');
// const router = express.Router();
// const controller = require('../controller/controller');
// const logger = new Logger('Router.log');

// router.get('/getItems', (req, res) => {
//     console.log('Request received: /getItems');
//     logger.log('Request received: /getItems');
//     controller.handleGetItems(req, res);
// });

// router.get('/getItem', (req, res) => {
//     console.log('Request received: /getItem');
//     logger.log('Request received: /getItem');
//     controller.handleGetItem(req, res);
// }

// // class Router {
// //     constructor(jsonfile) {
// //         this.controller = new Controller(jsonfile, 'Controller.log');
// //         this.logger = new Logger('Router.log');
// //     }

// //     handleRequest(req, res) {
// //         const parsedUrl = url.parse(req.url, true);
// //         this.logger.log(`Request received: ${parsedUrl.pathname}`);
// //         switch (parsedUrl.pathname) {
// //             case '/getItems':
// //                 this.logger.log(`Request received: ${parsedUrl.pathname}`);
// //                 this.controller.handleGetItems(req, res);
// //                 break;
// //             case '/getItem':
// //                 this.logger.log(`Request received: ${parsedUrl.pathname}`);
// //                 this.controller.handleGetItem(req, res);
// //                 break;
// //             case '/addItem':
// //                 this.logger.log(`Request received: ${parsedUrl.pathname}`);
// //                 this.controller.handleAddItem(req, res);
// //                 break;
// //             case '/updateItem':
// //                 this.logger.log(`Request received: ${parsedUrl.pathname}`);
// //                 this.controller.handleUpdateItem(req, res);
// //                 break;
// //             case '/deleteItem':
// //                 this.logger.log(`Request received: ${parsedUrl.pathname}`);
// //                 this.controller.handleDeleteItem(req, res);
// //                 break;
// //             default:
// //                 this.logger.error(`Invalid request received: ${parsedUrl.pathname}`);
// //                 res.writeHeader(404, {'Content-Type': 'text/plain'});
// //                 res.end('404 Not Found');
// //         }
// //     }
// // }

// // module.exports = Router;

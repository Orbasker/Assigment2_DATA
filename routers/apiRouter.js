const express = require("express");
const Router = express.Router();
const Controller = require("../controller/index");
const Logger = require("../logger/index");

class apiRouter {
  constructor() {
    this.router = Router;
    this.logger = new Logger.Logger("apiRouter.log");
    this.controller = new Controller.Controller("Controller.log");
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", async (req, res) => {
      console.log("Request received: /getItems");
      this.logger.log("Request received: /getItems");
      try {
        const result = await this.controller.handleGetItems(req, res);
        res.json({ success: "Items found", result });
      } catch (error) {
        res.status(404).json({ error: "Items not found" });
      }
    });

    this.router.get("/:name", async (req, res) => {
      console.log("Request received: /getItem");
      this.logger.log("Request received: /getItem");
      try {
        const result = await this.controller.handleGetItem(req.params.name);
        res.json({ success: "Item found", result });
      } catch (error) {
        if (error.message.includes("Name not found")) {
          res.status(404).json({ error: "Item not found" });
        } else {
          res.status(500).json({
            error: "Item not found but not due to error on your side",
          });
        }
      }
    });

    this.router.post("/", async (req, res) => {
      // TODO: check body match to schema and not duplicate key
      console.log("Request received: /addItem");
      this.logger.log("Request received: /addItem");
      const postBody = req.body;
      try {
        const result = await this.controller.handleAddItem(postBody);
        res.json({ success: "Item has been added", result });
      } catch (error) {
        if (error.message.includes("duplicate key")) {
          res.status(409).json({ error: "Item already exists" });
        } else {
          res
            .status(500)
            .json({ error: "Item not added due to error on our side" });
        }
      }
    });

    this.router.put("/:name", async (req, res) => {
      console.log(`Request received: /updateItem ${req.params.name}`);
      this.logger.log(`Request received: /updateItem ${req.params.name}`);
      try {
        const result = await this.controller.handleUpdateItem(
          req.params.name,
          req.body,
        );
        res.json({ success: "Item has been updated", result });
      } catch (error) {
        if (error.message.includes("Name not found")) {
          res.status(404).json({ error: "Item not found" });
        }
        res.status(500).json({ error: "Item not updated" });
      }
    });

    this.router.delete("/:name", async (req, res) => {
      console.log("Request received: /deleteItem");
      this.logger.log("Request received: /deleteItem");
      try {
        const result = await this.controller.handleDeleteItem(req.params.name);
        if (result == null) {
          res.status(404).json({ error: "Item not found" });
        } else {
          res.json({ success: "Item has been deleted", result });
        }
      } catch (error) {
        res.status(500).json({ error: "Item not deleted" });
      }
    });
  }
}

module.exports = { ApiRouter: apiRouter };

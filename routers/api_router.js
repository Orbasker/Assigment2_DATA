const express = require('express')
const apiRouter = express.Router()
const Controller = require('../controller/controller')
const { Logger } = require('../logger')
const logger = new Logger('Router.log')
const controller = new Controller.Controller('Controller.log')

apiRouter.get('/', async (req, res) => {
  console.log('Request received: /getItems')
  logger.log('Request received: /getItems')
  try {
    const result = await controller.handleGetItems(req, res)
    res.json({succuess: 'Items found', result})
  } catch (error) {
    res.status(404).json({error :'Items not found'})
  }
})

apiRouter.get('/:name', async (req, res) => {
  console.log('Request received: /getItem')
  logger.log('Request received: /getItem')
  try {
    const result = await controller.handleGetItem(req.params.name)
    res.json({succuess: 'Item found', result})
  } catch (error) {
    if (error.message.includes('Name not found')) {
      res.status(404).json({error: 'Item not found'})
    } else {
      res.status(500).json({error:'Item not found but not due to error on your side'})
    }
  }
})

apiRouter.post('/', async (req, res) => {
  // TODO: check body match to schema and not duplicate key
  console.log('Request received: /addItem')
  logger.log('Request received: /addItem')
  const postBody = req.body
  try {
    const result = await controller.handleAddItem(postBody)
    res.json({succuess: "Item has been added",result})
  } catch (error) {
    if (error.message.includes('duplicate key')) {
      res.status(409).json({error:'Item already exists'})
    } else {
      res.status(500).json({error: 'Item not added due to error on our side'})
    }
  }
})

apiRouter.put('/', async (req, res) => {
  console.log('Request received: /updateItem')
  logger.log('Request received: /updateItem')

  try {
    const result = await controller.handleUpdateItem(req.body)
    res.json({succuess: "Item has been updated",result})
  } catch (error) {
    if (error.message.includes('Name not found')) {
      res.status(404).json({error: 'Item not found'})
    }
    res.status(500).json({error: 'Item not updated'})
  }
})

apiRouter.delete('/:name', async (req, res) => {
  console.log('Request received: /deleteItem')
  logger.log('Request received: /deleteItem')
  try {
    const result = await controller.handleDeleteItem(req.params.name)
    if (result == null) {
      res.status(404).json({error:'Item not found'})
    } else {
      res.json({succuess: "Item has been deleted",result})
    }
  } catch (error) {
    res.status(500).json({error:'Item not deleted'})
  }
}
)

module.exports = apiRouter
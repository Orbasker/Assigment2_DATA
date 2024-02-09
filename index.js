const express = require('express')
const path = require('path')
const EmergenctSupplyRoutes = require('./routers/index').apiRouter
const router = new EmergenctSupplyRoutes()
const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/api', router.router)
app.use('/', (req, res) => {
  console.log('Request received')
  console.error('Requests should be directed to /api')
  res.status(404).send('Requests should be directed to /api')
}
)

app.listen(3000)
console.log('Listening on port 8080')

module.exports = app

const express = require('express')
const EmergenctSupplyRoutes = require('./routers/api_router')
const path = require('path')
const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/api', EmergenctSupplyRoutes)
app.use('/', (req, res) => {
  console.log('Request received')
  console.error('REquests should be directed to /api')
  res.status(404).send('Requests should be directed to /api')
}
)

app.listen(3000)
console.log('Listening on port 8080')

module.exports = app

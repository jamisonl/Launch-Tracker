const express = require('express')
const bodyParser = require('body-parser')
const { router } = require('../router/index.js')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')

const port = process.env.PORT || 1336

app.use(cors())
app.options('*', cors())

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "../dist")))

app.use("/api", router)

server.listen(port, () => {
  console.log('server is listening on port', port)
})




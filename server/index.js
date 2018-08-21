const express = require('express')
const bodyParser = require('body-parser')
const { router } = require('../router/index.js')
const path = require('path')
const cors = require('cors')
const cluster = require('cluster')
const compression = require('compression')
const next = require('next')

const port = process.env.PORT || 1336

if(cluster.isMaster) {
  let workers = require('os').cpus();
  workers.forEach(t => {
    cluster.fork()
  })
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Process ${worker.process.pid} died. Code: ${code} Signal: ${signal}`)
    cluster.fork()
  })
} else {
  const a = next()
  const handle = a.getRequestHandler()
  a.prepare()
  .then(() => {
    const app = express()
    app.use(cors())
    app.options('*', cors())
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json())
    app.use(compression())

    app.use("/api", router)
    app.get('*', (req, res) => {
      return handle(req, res)
    })

    require('http').Server(app).listen(port, () => console.log(`PID ${process.pid} listening on port ${port}`))
    })
    .catch((err) => {
      process.exit(1)
    })
}
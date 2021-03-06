const { getRocket, getRockets } = require('../db')

const queryLaunchController = {
  'get' : (req, res) => {
    getRocket(req.params.flight_number, (err, data) => {
      if(err) {
        res.status(400).send(err)
      }
      res.status(200).send(data)
    })
  },
  'getAll' : (req, res) => {
    getRockets((err, data) => {
      if(err) {
        res.status(400).send(err)
      }
      res.status(200).send(data)
    })
  }
}

module.exports = {queryLaunchController}

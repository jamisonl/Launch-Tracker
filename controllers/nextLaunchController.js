const { upcoming } = require('../db')

const nextLaunchController = {
  'get': (req, res) => {
    upcoming(req.params.flight_number, (err, data) => {
      if(err) {
        res.status(400).send(err)
      }
      res.status(200).send(data)
    })
  }
}

module.exports = { nextLaunchController }
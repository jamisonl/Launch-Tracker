const router = require('express').Router();
const { queryLaunchController } = require('../controllers/queryLaunchController')

  //gets parameter limited flight data, either searched through related text info or by corresponding flight number
router.route('/flight_data/:flight_number')
  .get(queryLaunchController.get)
  //returns all flights
router.route('/flight_data')
  .get(queryLaunchController.getAll)




module.exports = { router }
const router = require('express').Router();
const { nextLaunchController } = require('../controllers/nextLaunchController')
const { queryLaunchController } = require('../controllers/queryLaunchController')

  //gets future flights with specific flight number
router.route('/flight_number_future/:flight_number')
  .get(nextLaunchController.get)
router.route('/flight_number_future')
  .get(nextLaunchController.get)

  //gets past flights, either with specific mission_number or returning all past flights

router.route('/flight_number_history/:flight_number')
  .get(queryLaunchController.get)
router.route('/flight_number_history')
  .get(queryLaunchController.get)




module.exports.router = router;
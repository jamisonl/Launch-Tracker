const {
  MongoClient
} = require('mongodb');

let _db, _rockets, _upcoming;
const uri = process.env.DB
MongoClient.connect(uri, {
    poolSize: 10,
    useNewUrlParser: true
  })
  .then(client => {
    console.log('connected to db')
    _db = client.db()
    _rockets = _db.collection('launch_v2')
    _upcoming = _db.collection('upcoming_v2')
  })
  .catch(err => {
    console.log('error connecting to db \n', err)
  })


const getRocket = (id, cb) => {
  if (id) {
    if (!isNaN(parseInt(id))) {
      _rockets.find({
        flight_number: +id
      })
        .project({
          _id: 0
        })
        .sort({
          flight_number: 1
        })
        .limit(1)
        .toArray()
        .then(data => cb(null, data))
        .catch(err => cb(err, null))
    } else {
      _rockets.find(
        {$text: {$search: id}},
        {score: {$meta: "textScore"}}
      )
        .project({
          score:
          {$meta: "textScore"}
        },
        { _id: 0 }
      )
        .sort({
          score:
            {$meta: "textScore"}
        })
        // .limit(1)
        .toArray()
        .then(data => cb(null, data))
        .catch(err => cb(err, null))
    }
  } else {
    _rockets.find({})
      .project({
        _id: 0
      })
      .sort({
        flight_number: 1
      })
      .toArray()
      .then(data => cb(null, data))
      .catch(err => cb(err, null))
  }
}

const upcoming = (id, cb) => {
  if (id) {
    //find one from params
    _upcoming.findOne({
        flight_number: +id
      })
      .then(data => cb(null, data))
      .catch(err => cb(err, null))
  } else {
    //else find all
    _upcoming.find({})
      .project({
        _id: 0
      })
      .sort({
        flight_number: 1
      })
      .toArray()
      .then(data => cb(null, data))
      .catch(err => cb(err, null))
  }
}

module.exports = {
  getRocket,
  upcoming
}
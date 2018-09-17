const { MongoClient } = require('mongodb');

require('dotenv').config()

let _db, _rockets;
const uri = process.env.DB

MongoClient.connect(uri, {
    poolSize: 10,
    useNewUrlParser: true
  })
  .then(client => {
    console.log('connected to db')
    _db = client.db()
    _rockets = _db.collection('launch')
    _rockets.createIndex({"$**": "text"})
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
        .toArray()
        .then(data => cb(null, data))
        .catch(err => cb(err, null))
    }
  }
}
const getRockets = (cb) => {
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

module.exports = {
  getRocket,
  getRockets,
}
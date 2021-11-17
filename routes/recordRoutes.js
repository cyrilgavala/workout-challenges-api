const express = require('express');
const router = express.Router();
const Record = require('../models/record')

router.get('/records', async (req, res) => {
  console.log('%s INFO Received %s request for records %s', new Date().toISOString(), req.method, req.query)
  if (req.query.user === undefined) {
    console.error("%s ERROR Missing user parameter", new Date().toISOString());
    res.status(400).send({error: "Missing user parameter"});
  } else if (req.query.challengeKey === undefined) {
    console.error("%s ERROR Missing challengeKey parameter", new Date().toISOString());
    res.status(400).send({error: "Missing challengeKey parameter"});
  } else {
    Record.find({
      "user": req.query.user,
      "challengeKey": req.query.challengeKey
    }, 'challengeKey reps user date -_id', {sort: {date: 1}}, (err, data) => {
      if (err) res.status(500).send(err);
      else {
        if (data === null || data === undefined) {
          console.log("%s INFO No records found", new Date().toISOString());
          res.status(200).send([])
        } else {
          console.log("%s INFO Records found", new Date().toISOString())
          res.status(200).send(data)
        }
      }
    });
  }
})

router.put('/add-record', async (req, res) => {
  console.log('%s INFO Received %s request for adding record %s', new Date().toISOString(), req.method, req.body)
  if (req.body === undefined || Object.keys(req.body).length === 0) {
    console.error("%s ERROR Missing request body.", new Date().toISOString());
    res.status(400).send({error: "Missing request body"});
  } else if (req.body.challengeKey === null || req.body.challengeKey === undefined || req.body.reps === null || req.body.reps === undefined
    || req.body.user === null || req.body.user === undefined || req.body.date === null || req.body.date === undefined) {
    console.error("%s ERROR Missing parameter in request body.", new Date().toISOString());
    res.status(400).send({error: "Missing parameter in request body"});
  } else {
    const record = new Record(req.body);
    Record.create(record).then(r => {
      console.log("%s INFO Record inserted %s", new Date().toISOString(), r);
      res.status(200).send();
    }).catch(err => {
      console.error("%s ERROR %s", new Date().toISOString(), err);
      res.status(500).send({error: "Insertion failed"})
    });
  }
})

router.delete('/delete-record', async (req, res) => {
  console.log('%s INFO Received %s request for deleting record %s', new Date().toISOString(), req.method, req.body)
  if (req.body === undefined || Object.keys(req.body).length === 0) {
    console.error("%s ERROR Missing request body.", new Date().toISOString());
    res.status(400).send({error: "Missing request body"});
  } else if (req.body.challengeKey === null || req.body.challengeKey === undefined
    || req.body.user === null || req.body.user === undefined || req.body.date === null || req.body.date === undefined) {
    console.error("%s ERROR Missing parameter in request body.", new Date().toISOString());
    res.status(400).send({error: "Missing parameter in request body"});
  } else {
    Record.deleteOne({
      "user": req.body.user,
      "challengeKey": req.body.challengeKey,
      "date": new Date(req.body.date)
    }).then(r => {
      console.log("%s INFO Result for deletion: %s", new Date().toISOString(), r);
      res.status(200).send()
    }).catch(err => {
      console.error("%s ERROR %s", new Date().toISOString(), err);
      res.status(500).send({error: "Deletion failed"})
    });
  }
})

module.exports = router;
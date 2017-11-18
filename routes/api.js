const express = require('express')
const router = express.Router()
const movie = require('../models/movie.js')

router.post('/api/movie/add', function (req, res, next) {
  if (req.body.email) {
    movie.addWatcher(req.body.email).then((res) => {
      console.log(res)
    },(res) => {
      console.log(res)
    })
  }
  res.render('index')
})

router.get('/api/watcher/list', (req, res, next) => {
  movie.findAllWatcher().then(data => {
    res.json({ data })
  })
})

module.exports = router
const express = require('express')
const movie = require('../models/movie.js')
const router = express.Router()

router.post('/api/movie/add', function (req, res, next) {
  if (req.body.email) {
    movie.addWatcher(req.body.email).then((res) => {
      console.log(res)
    })
  }
  res.render('index')
})

module.exports = router
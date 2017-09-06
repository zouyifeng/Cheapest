const express = require('express')
const router = express.Router()

router.post('/api/movie/add', function (req, res, next) {
  console.log(req.body)
  res.render('index')
})

module.exports = router
const express = require('express')
const router = express.Router()

router.get('/',function (req, res, next) {
  console.log(req)
  res.render('index')
})

module.exports = router

const express = require('express')
const router = express.Router()
const getVoice = require('../utils/voice')

router.get('/',function (req, res, next) {
  res.render('index')
})

router.post('/api/getVoice', function (req, res, next) {
  console.log(req.body.url)
  if (req.body.url) {
    const info = {} 
    getVoice(req.body.url).then((data) => {
      console.log(data)
      res.json(data)  
    })
  }
})

module.exports = router

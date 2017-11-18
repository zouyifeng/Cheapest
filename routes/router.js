const express = require('express')
const router = express.Router()
const getVoice = require('../utils/voice')
const watcher = require('../models/movie')

router.get('/',function (req, res, next) {
  let watcherList = []  
  watcher.findAllWatcher().then(data=>{
    watcherList = data
    res.render('index', { watcherList: watcherList })  
    // res.render('index')  
  })
})

router.post('/api/getVoice', function (req, res, next) {
  console.log(req.body.url)
  if (req.body.url) {
    const info = {} 
    getVoice(req.body.url).then((data) => {
      console.log(data)
      res.json(data)
    }, (err) => {
      console.log(err)
    }).catch(e => {
      console.log(e)
    })
  }
})

module.exports = router

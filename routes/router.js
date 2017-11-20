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

router.post('/api/voice', function (req, res, next) {
  console.log(req.body.data.url)
  if (req.body.data) {
    const info = {} 
    getVoice(req.body.data.url).then((data) => {
      res.json(data)
    }, (err) => {
      res.json({err: 'err'})      
    }).catch(e => {
      res.json({err: 'err'})            
    })
  }
})

module.exports = router

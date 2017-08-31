const db = require('../db')
const Sequelize = require('sequelize')

const cheerio = require('cheerio')
const request = require('superagent')

var iconv = require('iconv-lite')


const App = db.define('app', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  status:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  url: Sequelize.STRING,
  name: Sequelize.STRING,
  icon: Sequelize.STRING,
  price: Sequelize.STRING
})

// App.sync()

// App.create({
//   name: 'a',
//   price: 3,
//   icon: 'aa',
//   url: 'cc'
// }).then(app => console.log(app))

// App.findAll().then(apps => {
  // console.log(apps)
// })

request.get('https://item.jd.com/4586850.html', (err, res, body) => {
    // console.log(res.text)

    const html = iconv.decode(body, 'gbk')
    const $ = cheerio.load(html)
    // console.log($('*[itemprop]'))
    console.log($('.sku-name').text().trim())
    // console.log($('.price'))
  })

const db = require('../db')
const Sequelize = require('sequelize')
const fetchOKBuyProductInfo = require('../utils/okbuy')
const mailer = require('../utils/mailer')
const schedule = require('node-schedule')

const log4js = require('log4js');
const logger = log4js.getLogger()

log4js.configure({
  appenders: {
    out: { type: 'console' },
    app: { type: 'file', filename: 'logs/site.log' }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'debug' }
  }
});

const App = db.define('apps', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  url: Sequelize.STRING,
  name: Sequelize.STRING,
  icon: Sequelize.STRING,
  price: Sequelize.STRING
})


App.create({
  name: 'info.name',
  price: 'info.price',
  icon: 'info.icon',
  url: 'info.ur'
}).then(product => resolve(product))

App.findAll().then(newWatcher => {
  console.log(newWatcher)
})

function add(info) {
  return new Promise((resolve, reject) => {
    App.findOne({
      where: {
        name: info.name
      }
    }).then(product => {
      if (product) {
        reject({
          status: 2,
          message: 'product existed'
        })
      } else {
        App.create({
          name: info.name,
          price: info.price,
          icon: info.icon,
          url: info.url
        }).then(product => resolve(product))
      }
    })
  })
}

function list () {
  return new Promise((resolve, reject) => {
    App.findAll()
      .then(apps => {
        resolve(apps)
      })
      .then(err => reject(err))
  })
}

// App.destroy({
//   where: {
//     url: 'cc'
//   }
// })

// list().then(apps => apps.map((app, index) => {
//   console.log(app.url)
// }))

function check() {
  return new Promise((resolve, reject) => {
    let count = 0 
    list().then(apps => apps.map((app, index) => {
      fetchOKBuyProductInfo(app.url)  
        .then(info => {
          logger.info('找到货物 ', info.name)
          count++
          if (count === apps.length) {
            // resolve()
            logger.info('所有物品检索完毕')
            
          }
          if (info.price !== app.price) {
            logger.info(`${info.name} 价格发生改变,原价 ￥${app.price}, 现价 ￥${info.price}`)
            mailer('zouyifeng@aliyun.com', app)
            // const numNewPrice = info.price
            // const numOriginPrice = app.price;
          }
        })
    }))
  })
}

// fetchOKBuyProductInfo('http://www.okbuy.com/p-converse/detail-shoe-17062555.html', add)
function productSchedule() {
  schedule.scheduleJob('3 * * * * *', function () {
    // console.log(i++)
    check()
  })
}

productSchedule()

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


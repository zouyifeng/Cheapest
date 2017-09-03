const db = require('../db')
const Sequelize = require('sequelize')
const fetchOKBuyProductInfo = require('../utils/okbuy')
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

logger.debug("Time:", new Date());



const App = db.define('app', {
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

// fetchOKBuyProductInfo('http://www.okbuy.com/p-converse/detail-shoe-17062555.html', add)
i = 0
function productSchedule() {
  schedule.scheduleJob('3 * * * * *', function () {
    console.log(i++)
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


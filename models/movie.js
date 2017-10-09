const db = require('../db')
const Sequelize = require('sequelize')
const fetchOKBuyProductInfo = require('../utils/okbuy')
const mailer = require('../utils/mailer')
const schedule = require('node-schedule')

const log4js = require('log4js')
const logger = log4js.getLogger()

log4js.configure({
  appenders: {
    out: { type: 'console' },
    app: { type: 'file', filename: 'logs/movie/moive.log' }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'debug' }
  }
});

const Watcher = db.define('watcher', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  email: Sequelize.STRING
})

Watcher.sync({force: false}).then(() => {
  return Watcher.create({
    email: "813306660@qq.com"
  })
})

// console.log(watcher)

Watcher.findAll().then(newWatcher => {
  console.log(newWatcher.length)
})

// function addWatcher(email) {
//   return new Promise((resolve, reject) => {
//     watcher.findOne({
//       where: {
//         email: email
//       }
//     }).then(watcher => {
//       if (watcher) {
//         reject({
//           status: 2,
//           message: 'watcher existed'
//         })
//       } else {
//         watcher.create({
//           name: email,
//         }).then(newWatcher => resolve(newWatcher))
//       }
//     })
//   })
// }

// function list () {
//   return new Promise((resolve, reject) => {
//     App.findAll()
//       .then(apps => {
//         resolve(apps)
//       })
//       .then(err => reject(err))
//   })
// }

// App.destroy({
//   where: {
//     url: 'cc'
//   }
// })

// list().then(apps => apps.map((app, index) => {
//   console.log(app.url)
// }))

// function check() {
//   return new Promise((resolve, reject) => {
//     let count = 0 
//     list().then(apps => apps.map((app, index) => {
//       fetchOKBuyProductInfo(app.url)  
//         .then(info =>{
//           console.log(info)
//           logger.info('找到货物 ', info.name)
//           count++
//           if (count === apps.length) {
//             // resolve()
//             logger.info('所有物品检索完毕')
            
//           }
//           if (info.price !== app.price) {
//             logger.info(`${info.name} 价格发生改变,原价 ￥${app.price}, 现价 ￥${info.price}`)
//             mailer('zouyifeng@aliyun.com', app)
//             // const numNewPrice = info.price
//             // const numOriginPrice = app.price;
//           }
//         })
//     }))
//   })
// }

// fetchOKBuyProductInfo('http://www.okbuy.com/p-converse/detail-shoe-17062555.html', add)
// function productSchedule() {
//   schedule.scheduleJob('3 * * * * *', function () {
//     // console.log(i++)
//     check()
//   })
// }

// productSchedule()



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

// module.exports = {
//   addWatcher
// }
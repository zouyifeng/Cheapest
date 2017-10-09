'use strict'

const Sequelize = require('sequelize')
const path = require('path')

const db = new Sequelize('cheapest', 'cheapest', 'cheapest', {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, './', 'db/catchem.sqlite')
})

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = db
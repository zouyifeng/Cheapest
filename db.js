'use strict'

const Sequelize = require('sequelize')
const path = require('path')

const db = new Sequelize('cheapest', 'cheapest', 'cheapest', {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, './', 'db/catchem.sqlite')
})

module.exports = db
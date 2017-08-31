const cheerio = require('cheerio')
const request = require('request')

function fetchProductInfo(url){
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          const $ = cheerio.load(res.text)
          const productInfo = $('.sku-name')
          
        }
      })
  })
}
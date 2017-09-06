const cheerio = require('cheerio')
const request = require('superagent') 
const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

const fetchOKBuyProductInfo = function(url) {
  request({
    url: url,
    headers: headers
  }, (err, res, body) => {
    console.log(body)
    console.log(res.text)
    const $ = cheerio.load(res.text)
    // console.log($('*[itemprop]'))
    console.log($('.itemInfo-wrap .p-price').html())
    // console.log($('.price'))
  })
}

module.exports = fetchJDProductInfo

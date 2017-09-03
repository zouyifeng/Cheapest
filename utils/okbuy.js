const cheerio = require('cheerio')
const request = require('superagent') 
const browserMsg = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded'
}

const fetchOKBuyProductInfo = function(url) {
  return new Promise((resolve, reject) => {
    let ret = {
      url: url,
      name: '',
      price: '',
      icon: ''
    }
    const id = url.match(/\d+/)[0]
  
    const pageInfoPromsie = request(url)
  
    const pricePromise = request
      .get(`http://www.okbuy.com/ajax/detail/product_info/${id}`)
      .set(browserMsg)
  
    Promise.all([pageInfoPromsie, pricePromise]).then((args) => {
      const $ = cheerio.load(args[0].text)
      ret.price = JSON.parse(args[1].text).salepr
      ret.name = $('#prodTitleName').text()
      ret.icon = $('#zoom1').find('img').eq(0).attr('src')
    
      resolve(ret)
    })
  })
}

module.exports = fetchOKBuyProductInfo

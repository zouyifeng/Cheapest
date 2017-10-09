const cheerio = require('cheerio')
const request = require('superagent') 
const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

const fetchMovieInfo = function() {
  request({
    url: 'http://www.dytt8.net/',
    headers: headers
  }, (err, res, body) => {
    const $ = cheerio.load(res.text)
    // console.log($('*[itemprop]'))
    console.log($('.co_content8').find('tbody'))
    // console.log($('.price'))
  })
}

fetchMovieInfo()

// module.exports = fetchMovieInfo

const app = require('../app')
const http = require('http')

app.set('port', 9999)

// http.createServer(app)

var server = app.listen(app.get('port'), function(){
  console.log('Server listen on port ' + server.address().port)
})
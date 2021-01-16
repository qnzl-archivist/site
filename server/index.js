const https = require('https')
const http = require('http')
const app = require('./app')
const fs = require('fs')

let { PORT } = process.env

PORT = PORT || 3093

if ('production' === process.env.NODE_ENV) {
  return https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/archivist.qnzl.co/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/archivist.qnzl.co/cert.pem')
  }, app).listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}, ENV=production`)
  })
} else {
  return http.createServer(app).listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}, ENV=staging`)
  })
}

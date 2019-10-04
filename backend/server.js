const express = require('express')

// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'work4UMS',
    database : 'ums'
  }
});

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/users', (req, res) => {
  var search = req.query.search || "";
  main.getTableData(req, res, db, 'users', search, 'first')
})
app.post('/users', (req, res) => main.postTableData(req, res, db, 'users'))
app.put('/users', (req, res) => main.putTableData(req, res, db, 'users'))
app.delete('/users', (req, res) => main.deleteTableData(req, res, db, 'users'))

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/groups', (req, res) => {
  var search = req.query.search || "";
  main.getTableData(req, res, db, 'groups', search, 'name')
})
app.post('/groups', (req, res) => main.postTableData(req, res, db, 'groups'))
app.put('/groups', (req, res) => main.putTableData(req, res, db, 'groups'))
app.delete('/groups', (req, res) => main.deleteTableData(req, res, db, 'groups'))


app.get('/usergroups', (req, res) => {
  var id = req.query.id || "";
  main.getGroupsOfUsers(id, res, db, 'groups')
})

app.post('/usergroups', (req, res) => {
  main.addGroupsOfUsers(req, res, db)
})

app.get('/groupusers', (req, res) => {
  var id = req.query.id || "";
  main.getUsersOfGroup(id, res, db, 'groups')
})

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})
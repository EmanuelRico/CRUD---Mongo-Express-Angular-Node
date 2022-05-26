'use strict'

const mongoose = require('mongoose')
const { mongoDB } = require('./URI')

mongoose.connect(mongoDB.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('database is on'))
.catch(err => console.log('there was an error : ${err}'))
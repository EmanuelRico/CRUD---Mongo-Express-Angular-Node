'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MyImage = new Schema({
    filename: {
        type: String,
    },
    fileUrl: {
        type: String,
    },
    uploadDate: {
        type: Date,
        default: Date.now()
    }
})

module.export = mongoose.model('MyImage', MyImage)
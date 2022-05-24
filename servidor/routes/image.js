'use strict'

const router = require('express').Router()
const MyImage = require('../models/image')
const storage = require('../config/multer')
const multer = require('multer')

const uploader = multer({
    storage
}).single('file')

router.post('/upload', uploader, async (req, res) => {
    
     const { body, file } = req
    console.log(body, 'a ver que')
    if(file && body) {
        const newImage = new MyImage({
            fileName: body.name,
            fileUrl: `http://localhost:4200/${file.filename}` 
        })
        await newImage.save()
        res.json({
            newImage: new MyImage
        })
    }
})


router.get('/descargar', async (req, res) => {
    
    try {
        //const images = await MyImage.find()
        //res.json(images)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
})

module.exports = router
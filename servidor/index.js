'use strict'
const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const path = require('path');

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//static files
app.use(express.static(path.join(__dirname, 'app/images')));


//routes
app.use('/api/image', require('./routes/image'));
app.use('/api/productos', require('./routes/producto'));
 
// server listening
app.listen(4000, () => {
    console.log('El servidor esta corriendo perfectamente')
})
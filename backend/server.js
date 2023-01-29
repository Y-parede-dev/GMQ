const express = require('express');
require("dotenv").config();
const api = express();
const port = /*process.env.PORT ||*/ 8080; // enlever le comment avant la mise en prod 
api.use('/',()=>{
    
})
api.listen(port, ()=>{
    console.log(`✨ Le serveur est en ligne et ecoute le port ${port}`)
})
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const router = require('./routes/routes')
const dotenv = require('dotenv')

dotenv.config({path:"./config.env"})

app.use(express.json());
app.use(cors("*"))

app.use('/',router)
mongoose.connect(process.env.MONGOURI).then(()=>{
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(error)
})
app.listen(3001,()=>{
    console.log("app running")
})
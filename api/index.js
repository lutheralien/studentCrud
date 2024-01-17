const express = require('express')
const mongoose = require("mongoose")
var routers = require('./routes/routes');

const app = express()
const cors = require('cors');
const port = 5000;

const mongodatabaseURL ="mongodb+srv://eyandilutherking2003:RYVz2CTmhUjdAHk3@cluster0.ketgllt.mongodb.net/Accounts";

mongoose.connect(mongodatabaseURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection


app.listen(port,()=>{
    console.log("Server is running port " +port);
})


connection.once("open",()=>{
    console.log("MongoDb Connected")
});

app.use(cors());
app.use(express.json());
app.use(routers);
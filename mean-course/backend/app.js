const express = require('express');
const bodyParser = require('body-parser');


const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb+srv://admin:727367235@cluster0.bul3z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true })
    .then(() => {
        console.log("Connected to the database successfully")
    })
    .catch(() => {
        console.log("Connection failed");
    })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, nex) => {
    console.log('handle req');
    next()
})
module.exports = app;

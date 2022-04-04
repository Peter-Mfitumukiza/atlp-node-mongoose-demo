const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/expres-demo", {useNewUrlParser: true})
    .then(()=>{
        const app = express();
        app.use(express.json());
        app.use("/api", routes);
        
        app.listen(5000, ()=>{
            console.log("Server started on port 5000.....");
        })
    })


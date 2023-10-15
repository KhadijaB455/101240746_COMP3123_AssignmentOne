const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

const DB_CONNECTION_STRING = "mongodb+srv://dbKhad:yaPBfxgEeWYtoqS0@cluster0.ngjyla5.mongodb.net/f2023_comp3123?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const SERVER_PORT = process.env.PORT || 3000;

app.route("/")
    .get((req, res) => {
        res.send("<h1>HOME PAGE</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
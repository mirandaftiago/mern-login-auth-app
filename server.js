require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const app = express();

// body-parser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

// DB config
const db = process.env.MONGOURI;

// connect to mongoDB
mongoose
    .connect(
        db, { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!`));
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/users', require('./routes/user'));
app.use('/todo', require('./routes/todos'));
app.use('/refreshToken', require('./routes/refreshToken'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
    });

app.use(cors());
app.use(express.json());

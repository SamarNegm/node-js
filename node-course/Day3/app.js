const express = require('express');
const toursRouter = require('./routes/v1/tours');
const usersRouter = require('./routes/v1/users.js');
const cors = require('cors');
const multer = require('multer');

const upload = multer({ dest: `${__dirname}/public/storage` });

const app = express();
app.use(express.json());

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use(express.static(` ${__dirname} + '/public'`))
app.all('*', (req, res) => {
    res.json({
        status: 'failure',
        message: 'wrong url'
    })
});

const corsOptions = {
    origin: 'http://mongoosejs.com'
}
app.use(cors());

app.use((err, req, res, next) => {
    console.log('global error handler');
    res.json(err);
});
module.exports = app;
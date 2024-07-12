const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRouter = require('./Routers/authRoute');
//middleware
app.use(express.json());
app.use(cors());

//route 
app.use('/api/auth', authRouter);

//mongoDB connection
mongoose
    .connect('mongodb://127.0.0.1:27017/authentication')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

//global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

//server
const PORT = 3000;
app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);
});
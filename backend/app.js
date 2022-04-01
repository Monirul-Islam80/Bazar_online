const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const path = require('path')

if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({path:"backend/config/config.env"});
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
//router
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.use(express.static(path.join(__dirname, "../frontend/build/")));
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})
// error middleware
app.use(errorMiddleware);
module.exports = app;
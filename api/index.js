const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/data');
const { notfound, errorHandler } = require('./middlewares/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoute');
const prodcategory = require('./routes/prodcategoryRoute');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');


dbConnect();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', prodcategory);

app.use(notfound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Serveur tourne au port: ${port}`);
});
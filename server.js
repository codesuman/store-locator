const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db')

// load env vars
dotenv.config({path: './config/config.env'});

// Connect to DB
connectDB();

const app = express();

// Body parser
app.use(express.json())

// CORS
app.use(cors())

// Routes
app.use('/api/v1/stores', require('./routes/store'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
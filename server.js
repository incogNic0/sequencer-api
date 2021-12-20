if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
};

const express =  require('express');
const app = express();
const path = require('path');
const { errorHandler } = require('./helpers/utils');

// MONGO
const connectDB = require('./helpers/db');
connectDB();


// MIDDLEWARE
app.use(express.json());

// ROUTES
const usersRoute = require('./routes/api/users');

app.use('/api/users', usersRoute);


app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running of port ${PORT}...`));
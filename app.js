const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const itemRoutes = require("./routes/item");
const customerRoutes = require("./routes/customer");

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use("/items", itemRoutes);
app.use("/customers", customerRoutes);

module.exports = app;

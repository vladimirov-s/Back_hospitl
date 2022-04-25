require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.port || 5000;
const coockeparser = require('cookie-parser');
const router = require('./src/routes/router');
const app = express();

app.use(cors());
app.use(express.json());
app.use(coockeparser());
app.use('/api', router);

const start = async () => {
  try {
    await mongoose.connect(process.env.url, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(port, () => console.log(`listen port-${port}`));
  } catch (err) {
    console.log(err);
  }
}

start();
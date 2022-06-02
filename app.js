const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const index = require("./src/routes/index");
const config = require("./src/config/config");
const PORT = config.port || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(config.corsOptions));
app.use(index);

const start = () => {
  try {
    mongoose.connect(config.urlDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`listen port-${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

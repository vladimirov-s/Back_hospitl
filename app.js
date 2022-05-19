require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./src/routes/auth");
const app = express();
const corsOptions = require("./src/config");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", router);

const start = async () => {
  try {
    mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`listen port-${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

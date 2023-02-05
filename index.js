require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// port
const port = process.env.PORT || 5000;

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.get("/", (req, res) => {
  res.send("Welcome to our server!");
});

// listening
app.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});

// mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed,", error.message));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

mongoose
  .connect(MONGO_URI)
  .then(
    app.listen(5000, () => console.log(`Server is running on port ${port}`))
  )
  .catch((error) => {
    console.log(error);
  });
